"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Mail, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SocialShareButtonsProps {
  title?: string
  text?: string
  url?: string
  hashtags?: string[]
  className?: string
  showLabels?: boolean
}

export function SocialShareButtons({
  title,
  text,
  url,
  hashtags,
  className = "",
  showLabels = false,
}: SocialShareButtonsProps) {
  const { toast } = useToast()

  const handleShare = (platform: "facebook" | "twitter" | "linkedin" | "email") => {
    // Create share URLs based on platform
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url || window.location.href)}&quote=${encodeURIComponent(text || "")}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text || "")}&url=${encodeURIComponent(url || window.location.href)}`
        if (hashtags && hashtags.length > 0) {
          shareUrl += `&hashtags=${hashtags.join(",")}`
        }
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url || window.location.href)}`
        break
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title || "")}&body=${encodeURIComponent(`${text || ""}\n\n${url || window.location.href}`)}`
        break
    }

    // Open in a new window
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }

    toast({
      title: "Sharing",
      description: `Sharing to ${platform}...`,
    })
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url || window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
        toast({
          title: "Sharing Failed",
          description: "Please try one of the other sharing options.",
          variant: "destructive",
        })
        return
      }
    } else {
      toast({
        title: "Not Supported",
        description: "Native sharing is not supported on this device.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Button
        variant="outline"
        size={showLabels ? "default" : "icon"}
        onClick={() => handleShare("facebook")}
        aria-label="Share on Facebook"
      >
        <Facebook className={showLabels ? "mr-2 h-4 w-4" : "h-4 w-4"} />
        {showLabels && "Facebook"}
      </Button>

      <Button
        variant="outline"
        size={showLabels ? "default" : "icon"}
        onClick={() => handleShare("twitter")}
        aria-label="Share on Twitter"
      >
        <Twitter className={showLabels ? "mr-2 h-4 w-4" : "h-4 w-4"} />
        {showLabels && "Twitter"}
      </Button>

      <Button
        variant="outline"
        size={showLabels ? "default" : "icon"}
        onClick={() => handleShare("linkedin")}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className={showLabels ? "mr-2 h-4 w-4" : "h-4 w-4"} />
        {showLabels && "LinkedIn"}
      </Button>

      <Button
        variant="outline"
        size={showLabels ? "default" : "icon"}
        onClick={() => handleShare("email")}
        aria-label="Share via Email"
      >
        <Mail className={showLabels ? "mr-2 h-4 w-4" : "h-4 w-4"} />
        {showLabels && "Email"}
      </Button>

      {typeof navigator !== "undefined" && navigator.share && (
        <Button
          variant="outline"
          size={showLabels ? "default" : "icon"}
          onClick={handleNativeShare}
          aria-label="Share using device options"
        >
          <Share2 className={showLabels ? "mr-2 h-4 w-4" : "h-4 w-4"} />
          {showLabels && "Share"}
        </Button>
      )}
    </div>
  )
}
