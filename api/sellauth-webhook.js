const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1448311570089381970/WrslhJCNsxkj7eezA2zKTJdlOUoLPOvXzxYh90t_rbVIFDJXp-zvQdlNDDz1GpnZT6d7";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const data = req.body || {};

    const product =
      data.product_name ||
      data.product ||
      data.item_name ||
      "Unknown product";

    const priceValue =
      data.price || data.amount || data.total || "Unknown amount";

    const currency = data.currency || "USD";

    const content = `🛒 **New Order**
> **Product:** ${product}
> **Price:** ${priceValue} ${currency}`;

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    console.log("SellAuth webhook received:", data);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ ok: false });
  }
}
