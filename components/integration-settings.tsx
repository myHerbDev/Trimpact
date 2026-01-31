"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

// Define integration types
type IntegrationType = "zapier" | "make" | "monday" | "atlassian" | "slack" | "custom"

interface IntegrationConfig {
  name: string
  apiKey?: string
  webhookUrl?: string
  enabled: boolean
}

export function IntegrationSettings() {
  const { toast } = useToast()

  // Mock integration configs
  const [configs, setConfigs] = useState<Record<IntegrationType, IntegrationConfig>>({
    zapier: { name: "Zapier", enabled: false },
    make: { name: "Make (Integromat)", enabled: false },
    monday: { name: "Monday.com", enabled: false },
    atlassian: { name: "Atlassian", enabled: false },
    slack: { name: "Slack", enabled: false },
    custom: { name: "Custom Webhook", enabled: false },
  })

  const handleToggleIntegration = (type: IntegrationType, enabled: boolean) => {
    setConfigs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        enabled,
      },
    }))

    toast({
      title: enabled ? "Integration Enabled" : "Integration Disabled",
      description: `${configs[type].name} integration has been ${enabled ? "enabled" : "disabled"}.`,
    })
  }

  const handleUpdateConfig = (type: IntegrationType, field: "apiKey" | "webhookUrl", value: string) => {
    setConfigs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }))
  }

  const handleSaveConfig = (type: IntegrationType) => {
    toast({
      title: "Integration Updated",
      description: `${configs[type].name} integration settings have been saved.`,
    })
  }

  const handleTestIntegration = async (type: IntegrationType) => {
    // Simulate a test
    const success = Math.random() > 0.3 // 70% chance of success

    if (success) {
      toast({
        title: "Test Successful",
        description: `Successfully sent test event to ${configs[type].name}.`,
      })
    } else {
      toast({
        title: "Test Failed",
        description: `Failed to send test event to ${configs[type].name}. Please check your configuration.`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Integration Settings</h2>
      <p className="text-gray-500">Connect myHerb with your favorite tools and services</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Object.keys(configs) as IntegrationType[]).map((type) => (
          <Card key={type}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{configs[type].name}</CardTitle>
                <Switch
                  checked={configs[type].enabled}
                  onCheckedChange={(checked) => handleToggleIntegration(type, checked)}
                />
              </div>
              <CardDescription>{getIntegrationDescription(type)}</CardDescription>
            </CardHeader>
            <CardContent>
              {configs[type].enabled && (
                <div className="space-y-4">
                  {type !== "custom" && (
                    <div className="space-y-2">
                      <Label htmlFor={`${type}-api-key`}>API Key</Label>
                      <Input
                        id={`${type}-api-key`}
                        value={configs[type].apiKey || ""}
                        onChange={(e) => handleUpdateConfig(type, "apiKey", e.target.value)}
                        placeholder={`Enter your ${configs[type].name} API key`}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor={`${type}-webhook`}>Webhook URL</Label>
                    <Input
                      id={`${type}-webhook`}
                      value={configs[type].webhookUrl || ""}
                      onChange={(e) => handleUpdateConfig(type, "webhookUrl", e.target.value)}
                      placeholder={`Enter your ${configs[type].name} webhook URL`}
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => handleTestIntegration(type)}
                      disabled={!configs[type].webhookUrl}
                    >
                      Test Connection
                    </Button>
                    <Button onClick={() => handleSaveConfig(type)}>Save</Button>
                  </div>
                </div>
              )}

              {!configs[type].enabled && (
                <div className="py-4 text-center text-gray-500">Enable this integration to configure settings</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function getIntegrationDescription(type: IntegrationType): string {
  switch (type) {
    case "zapier":
      return "Connect with 3,000+ apps through Zapier automations"
    case "make":
      return "Create complex workflows with Make (formerly Integromat)"
    case "monday":
      return "Sync tree planting data with Monday.com boards"
    case "atlassian":
      return "Connect with Jira, Confluence, and other Atlassian products"
    case "slack":
      return "Send notifications and updates to Slack channels"
    case "custom":
      return "Set up a custom webhook for your own integrations"
    default:
      return "Connect with external services"
  }
}
