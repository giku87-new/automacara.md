// Cloudflare Worker entrypoint for automacara.md
// Serves static pre-rendered assets and handles POST /api/lead inquiries

export interface WorkerEnv {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  WEB3FORMS_ACCESS_KEY?: string;
}

interface LeadPayload {
  name?: string;
  phone?: string;
  format?: string;
  location?: string;
  details?: string;
  lang?: string;
  pageUrl?: string;
  submittedAt?: string;
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/lead') {
      if (request.method !== 'POST') {
        return Response.json({ ok: false, error: 'Method Not Allowed' }, { status: 405 });
      }

      try {
        const body = (await request.json()) as LeadPayload;
        const name = (body.name || '').trim().slice(0, 120);
        const phone = (body.phone || '').trim().slice(0, 50);
        const format = (body.format || 'Standard').trim().slice(0, 80);
        const location = (body.location || 'mun. Chișinău').trim().slice(0, 120);
        const details = (body.details || '-').trim().slice(0, 500);
        const lang = (body.lang || 'ro').trim().slice(0, 5);

        if (!name || !phone) {
          return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
        }

        // Structured JSON log for Cloudflare Workers Logs & Traces
        console.log(
          JSON.stringify({
            message: 'lead_submission_received',
            name,
            phone,
            format,
            location,
            lang,
            timestamp: new Date().toISOString()
          })
        );

        let deliveredVia = 'workers_log';

        // 1. Optional Telegram Bot instant notification (configure via `wrangler secret put TELEGRAM_BOT_TOKEN` & `TELEGRAM_CHAT_ID`)
        if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
          const text = [
            '🏗 *SOLICITARE NOUĂ — AUTOMACARA.MD*',
            `• *Nume / Companie:* ${name}`,
            `• *Telefon:* ${phone}`,
            `• *Format:* ${format}`,
            `• *Locație:* ${location}`,
            `• *Detalii:* ${details}`,
            `• *Limbă:* ${lang.toUpperCase()}`
          ].join('\n');

          const tgRes = await fetch(
            `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: env.TELEGRAM_CHAT_ID,
                text,
                parse_mode: 'Markdown'
              })
            }
          );

          if (tgRes.ok) {
            deliveredVia = 'telegram';
          } else {
            console.error(
              JSON.stringify({
                message: 'telegram_delivery_failed',
                status: tgRes.status
              })
            );
          }
        }

        // 2. Optional Web3Forms email relay (configure via `wrangler secret put WEB3FORMS_ACCESS_KEY`)
        if (env.WEB3FORMS_ACCESS_KEY) {
          const emailRes = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              access_key: env.WEB3FORMS_ACCESS_KEY,
              subject: `Solicitare Automacara 25T — ${name} (${phone})`,
              from_name: 'automacara.md Dispecerat',
              name,
              phone,
              format,
              location,
              details
            })
          });
          if (emailRes.ok && deliveredVia === 'workers_log') {
            deliveredVia = 'web3forms';
          }
        }

        return Response.json({ ok: true, deliveredVia }, { status: 200 });
      } catch (err) {
        console.error(
          JSON.stringify({
            message: 'lead_endpoint_error',
            error: err instanceof Error ? err.message : String(err)
          })
        );
        return Response.json({ ok: false, error: 'Invalid request payload' }, { status: 400 });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
