export interface SocialShareOptions {
  platform: "facebook" | "twitter" | "linkedin" | "email" | "whatsapp"
  title?: string
  text?: string
  url?: string
  hashtags?: string[]
  via?: string // Twitter only
}

export function shareToSocial(options: SocialShareOptions): void {
  const { platform, title, text, url, hashtags, via } = options

  // Default values
  const shareTitle = title || "Check out my impact with myHerb!"
  const shareText = text || "I'm helping reforest the planet with myHerb. Join me!"
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")
  const shareHashtags = hashtags?.join(",") || "reforestation,sustainability,climateaction"

  let shareLink = ""

  switch (platform) {
    case "facebook":
      shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
      break

    case "twitter":
      shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${shareHashtags}`
      if (via) shareLink += `&via=${via}`
      break

    case "linkedin":
      shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
      break

    case "email":
      shareLink = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
      break

    case "whatsapp":
      shareLink = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
      break

    default:
      console.error("Unsupported sharing platform")
      return
  }

  // Open in a new window
  if (typeof window !== "undefined") {
    window.open(shareLink, "_blank", "width=600,height=400")
  }
}

export function canUseNativeShare(): boolean {
  return typeof navigator !== "undefined" && !!navigator.share
}

export async function nativeShare(options: {
  title?: string
  text?: string
  url?: string
  files?: File[]
}): Promise<boolean> {
  if (!canUseNativeShare()) {
    return false
  }

  try {
    await navigator.share(options)
    return true
  } catch (error) {
    console.error("Error sharing:", error)
    return false
  }
}
