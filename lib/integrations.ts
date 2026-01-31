export interface IntegrationConfig {
  name: string
  apiKey?: string
  webhookUrl?: string
  enabled: boolean
}

export interface IntegrationPayload {
  event: string
  data: Record<string, any>
  timestamp: number
}

export type IntegrationType = "zapier" | "make" | "monday" | "atlassian" | "slack" | "custom"

class IntegrationManager {
  private configs: Record<IntegrationType, IntegrationConfig> = {
    zapier: { name: "Zapier", enabled: false },
    make: { name: "Make (Integromat)", enabled: false },
    monday: { name: "Monday.com", enabled: false },
    atlassian: { name: "Atlassian", enabled: false },
    slack: { name: "Slack", enabled: false },
    custom: { name: "Custom Webhook", enabled: false },
  }

  constructor() {
    // In a real app, we would load configs from localStorage or API
    this.loadConfigs()
  }

  private loadConfigs() {
    if (typeof window !== "undefined") {
      const savedConfigs = localStorage.getItem("integration_configs")
      if (savedConfigs) {
        this.configs = JSON.parse(savedConfigs)
      }
    }
  }

  private saveConfigs() {
    if (typeof window !== "undefined") {
      localStorage.setItem("integration_configs", JSON.stringify(this.configs))
    }
  }

  public getConfig(type: IntegrationType): IntegrationConfig {
    return this.configs[type]
  }

  public getAllConfigs(): Record<IntegrationType, IntegrationConfig> {
    return this.configs
  }

  public updateConfig(type: IntegrationType, config: Partial<IntegrationConfig>): void {
    this.configs[type] = { ...this.configs[type], ...config }
    this.saveConfigs()
  }

  public async sendEvent(type: IntegrationType, payload: IntegrationPayload): Promise<boolean> {
    const config = this.configs[type]

    if (!config.enabled || !config.webhookUrl) {
      console.error(`Integration ${type} is not properly configured`)
      return false
    }

    try {
      const response = await fetch(config.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return true
    } catch (error) {
      console.error(`Failed to send event to ${type}:`, error)
      return false
    }
  }

  public async triggerTreePlantedEvent(treeCount: number, project: string, cost: number): Promise<void> {
    const payload: IntegrationPayload = {
      event: "tree_planted",
      data: {
        tree_count: treeCount,
        project,
        cost,
        user_id: "current_user_id", // In a real app, get from auth
      },
      timestamp: Date.now(),
    }

    // Send to all enabled integrations
    Object.entries(this.configs).forEach(async ([type, config]) => {
      if (config.enabled) {
        await this.sendEvent(type as IntegrationType, payload)
      }
    })
  }

  public async triggerAchievementUnlockedEvent(achievementId: string, achievementName: string): Promise<void> {
    const payload: IntegrationPayload = {
      event: "achievement_unlocked",
      data: {
        achievement_id: achievementId,
        achievement_name: achievementName,
        user_id: "current_user_id", // In a real app, get from auth
      },
      timestamp: Date.now(),
    }

    // Send to all enabled integrations
    Object.entries(this.configs).forEach(async ([type, config]) => {
      if (config.enabled) {
        await this.sendEvent(type as IntegrationType, payload)
      }
    })
  }
}

// Export singleton instance
export const integrationManager = new IntegrationManager()
