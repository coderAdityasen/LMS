import { NextResponse } from "next/server";
import { recordPayment } from "@/lib/data/repository";
import { paymentEventSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (process.env.NODE_ENV === "production" && !secret) {
    return NextResponse.json({ error: "Webhook secret is not configured." }, { status: 500 });
  }
  if (secret && request.headers.get("x-webhook-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const parsed = paymentEventSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  try {
    const id = await recordPayment({
      user_id: parsed.data.user_id,
      course_id: parsed.data.course_id,
      amount_paid: parsed.data.amount,
      payment_status: parsed.data.status,
      payment_reference: parsed.data.payment_reference,
    });
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not record payment.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
