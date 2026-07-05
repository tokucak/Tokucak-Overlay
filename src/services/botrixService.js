const SUB_URL =
  "https://botrix.live/widgets/labels?bid=zlh2vuUnZi4VTrxmCBwLcg&text=Son+abone%3A+%7Bvalue%7D&font=Arial&type=ultimoSub&platform=kick";

const GIFT_URL =
  "https://botrix.live/widgets/labels?bid=zlh2vuUnZi4VTrxmCBwLcg&text=Son+abonelik+hediye+eden%3A+%7Bvalue%7D&font=Arial&type=ultimoGift&platform=kick";

async function getLabel(url) {
  try {
    const res = await fetch(url);

    const text = await res.text();

    return text
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  } catch {
    return "Yok";
  }
}

export async function getLastSubscriber() {
  return await getLabel(SUB_URL);
}

export async function getLastGiftSubscriber() {
  return await getLabel(GIFT_URL);
}