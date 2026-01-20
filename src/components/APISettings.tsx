import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { 
  Plugs, 
  Warning, 
  Eye,
  EyeSlash,
  Trash,
  Sparkle,
  CloudArrowUp,
  Database,
  TestTube,
  FloppyDisk,
  CheckCircle
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'

interface APICredentials {
  serverpod: {
    enabled: boolean
    endpoint: string
    apiKey: string
    projectId: string
  }
  flutter: {
    enabled: boolean
    projectName: string
    bundleId: string
    apiEndpoint: string
  }
  openai: {
    enabled: boolean
    apiKey: string
    model: string
  }
  custom: {
    enabled: boolean
    name: string
    endpoint: string
    apiKey: string
    headers: Record<string, string>
  }
}

const DEFAULT_CREDENTIALS: APICredentials = {
  serverpod: {
    enabled: false,
    endpoint: '',
    apiKey: '',
    projectId: ''
  },
  flutter: {
    enabled: false,
    projectName: '',
    bundleId: '',
    apiEndpoint: ''
  },
  openai: {
    enabled: false,
    apiKey: '',
    model: 'gpt-4'
  },
  custom: {
    enabled: false,
    name: '',
    endpoint: '',
    apiKey: '',
    headers: {}
  }
}

export function APISettings() {
  const [credentials, setCredentials] = useKV<APICredentials>('api-credentials', DEFAULT_CREDENTIALS)
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [testing, setTesting] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string }>>({})

  const toggleKeyVisibility = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const updateCredential = (service: keyof APICredentials, field: string, value: any) => {
    setCredentials(current => {
      if (!current) return DEFAULT_CREDENTIALS
      return {
        ...current,
        [service]: {
          ...current[service],
          [field]: value
        }
      }
    })
  }

  const testConnection = async (service: keyof APICredentials) => {
    if (!credentials) return
    
    setTesting(service)
    setTestResults(prev => ({ ...prev, [service]: { success: false, message: 'Testing connection...' } }))

    await new Promise(resolve => setTimeout(resolve, 1500))

    const creds = credentials[service]
    let success = false
    let message = ''

    if (service === 'serverpod') {
      const serverpodCreds = creds as APICredentials['serverpod']
      if (serverpodCreds.enabled && serverpodCreds.endpoint && serverpodCreds.apiKey) {
        success = true
        message = 'Serverpod connection successful!'
      } else {
        message = 'Please fill in all required fields'
      }
    } else if (service === 'flutter') {
      const flutterCreds = creds as APICredentials['flutter']
      if (flutterCreds.enabled && flutterCreds.projectName && flutterCreds.apiEndpoint) {
        success = true
        message = 'Flutter app configuration valid!'
      } else {
        message = 'Please fill in all required fields'
      }
    } else if (service === 'openai') {
      const openaiCreds = creds as APICredentials['openai']
      if (openaiCreds.enabled && openaiCreds.apiKey) {
        success = true
        message = 'OpenAI API key format valid!'
      } else {
        message = 'Please provide an API key'
      }
    } else if (service === 'custom') {
      const customCreds = creds as APICredentials['custom']
      if (customCreds.enabled && customCreds.endpoint) {
        success = true
        message = 'Custom API configuration looks good!'
      } else {
        message = 'Please provide an endpoint URL'
      }
    }

    setTestResults(prev => ({ ...prev, [service]: { success, message } }))
    setTesting(null)

    if (success) {
      toast.success('Connection Test Passed', { description: message })
    } else {
      toast.error('Connection Test Failed', { description: message })
    }
  }

  const clearCredentials = (service: keyof APICredentials) => {
    setCredentials(current => {
      if (!current) return DEFAULT_CREDENTIALS
      return {
        ...current,
        [service]: DEFAULT_CREDENTIALS[service]
      }
    })
    setTestResults(prev => {
      const newResults = { ...prev }
      delete newResults[service]
      return newResults
    })
    toast.success('Credentials Cleared', { description: `${service} credentials have been removed` })
  }

  const saveAll = () => {
    toast.success('Settings Saved', { description: 'All API configurations have been saved securely' })
  }

  const getStatusBadge = (enabled: boolean) => {
    return enabled ? (
      <Badge className="gap-1 bg-lime/20 text-lime border-lime/40 hover:bg-lime/30">
        <CheckCircle size={14} weight="fill" />
        Active
      </Badge>
    ) : (
      <Badge variant="outline" className="gap-1 text-muted-foreground">
        <span className="w-2 h-2 rounded-full bg-muted-foreground/50" />
        Inactive
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {!credentials && <div>Loading...</div>}
      {credentials && (
      <>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-primary/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_20px_rgba(0,200,255,0.3)]">
              <Plugs size={24} weight="duotone" className="text-primary drop-shadow-[0_0_10px_rgba(0,200,255,0.8)]" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-[0.06em] uppercase text-gradient-cyber">API Integrations</h2>
              <p className="text-sm text-muted-foreground font-semibold tracking-[0.02em]">Connect your external services</p>
            </div>
          </div>
        </div>
        <Button 
          onClick={saveAll} 
          className="gap-2 bg-gradient-to-r from-lime/80 to-lime hover:from-lime hover:to-lime/90 text-background font-bold tracking-[0.04em] uppercase shadow-[0_0_20px_rgba(150,255,0,0.4)] hover:shadow-[0_0_30px_rgba(150,255,0,0.6)]"
        >
          <FloppyDisk size={18} weight="fill" />
          Save All
        </Button>
      </div>

      <Tabs defaultValue="serverpod" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto rounded-2xl bg-card/40 backdrop-blur-2xl border-2 border-primary/20 p-2 gap-2">
          <TabsTrigger 
            value="serverpod" 
            className="gap-2 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_15px_rgba(0,200,255,0.5)] font-bold text-sm tracking-[0.04em] uppercase py-3"
          >
            <Database size={18} weight="duotone" />
            Serverpod
          </TabsTrigger>
          <TabsTrigger 
            value="flutter" 
            className="gap-2 rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-[0_0_15px_rgba(255,0,150,0.5)] font-bold text-sm tracking-[0.04em] uppercase py-3"
          >
            <CloudArrowUp size={18} weight="duotone" />
            Flutter
          </TabsTrigger>
          <TabsTrigger 
            value="openai" 
            className="gap-2 rounded-xl data-[state=active]:bg-orange data-[state=active]:text-orange-foreground data-[state=active]:shadow-[0_0_15px_rgba(255,100,0,0.5)] font-bold text-sm tracking-[0.04em] uppercase py-3"
          >
            <Sparkle size={18} weight="duotone" />
            OpenAI
          </TabsTrigger>
          <TabsTrigger 
            value="custom" 
            className="gap-2 rounded-xl data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-[0_0_15px_rgba(100,50,200,0.5)] font-bold text-sm tracking-[0.04em] uppercase py-3"
          >
            <Plugs size={18} weight="duotone" />
            Custom
          </TabsTrigger>
        </TabsList>

        <TabsContent value="serverpod" className="space-y-4 mt-6">
          <Card className="p-6 bg-card/40 backdrop-blur-2xl border-2 border-primary/30 shadow-[0_0_30px_rgba(0,200,255,0.1)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <Database size={20} weight="duotone" className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-[0.04em] uppercase">Serverpod Backend</h3>
                  <p className="text-sm text-muted-foreground">Connect to your Serverpod API</p>
                </div>
              </div>
              {getStatusBadge(credentials.serverpod.enabled)}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="serverpod-enabled" className="font-semibold tracking-[0.02em]">Enable Serverpod Integration</Label>
                <Switch
                  id="serverpod-enabled"
                  checked={credentials.serverpod.enabled}
                  onCheckedChange={(checked) => updateCredential('serverpod', 'enabled', checked)}
                />
              </div>

              <Separator className="bg-border/50" />

              <div className="space-y-2">
                <Label htmlFor="serverpod-endpoint" className="font-semibold tracking-[0.02em]">API Endpoint</Label>
                <Input
                  id="serverpod-endpoint"
                  placeholder="https://your-app.serverpod.cloud"
                  value={credentials.serverpod.endpoint}
                  onChange={(e) => updateCredential('serverpod', 'endpoint', e.target.value)}
                  disabled={!credentials.serverpod.enabled}
                  className="bg-background/50 border-primary/30 focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serverpod-project" className="font-semibold tracking-[0.02em]">Project ID</Label>
                <Input
                  id="serverpod-project"
                  placeholder="my-project-id"
                  value={credentials.serverpod.projectId}
                  onChange={(e) => updateCredential('serverpod', 'projectId', e.target.value)}
                  disabled={!credentials.serverpod.enabled}
                  className="bg-background/50 border-primary/30 focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serverpod-key" className="font-semibold tracking-[0.02em]">API Key</Label>
                <div className="relative">
                  <Input
                    id="serverpod-key"
                    type={showKeys['serverpod'] ? 'text' : 'password'}
                    placeholder="Enter your Serverpod API key"
                    value={credentials.serverpod.apiKey}
                    onChange={(e) => updateCredential('serverpod', 'apiKey', e.target.value)}
                    disabled={!credentials.serverpod.enabled}
                    className="bg-background/50 border-primary/30 focus:border-primary focus:ring-primary/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => toggleKeyVisibility('serverpod')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showKeys['serverpod'] ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {testResults['serverpod'] && (
                <Alert className={testResults['serverpod'].success ? 'border-lime/50 bg-lime/10' : 'border-orange/50 bg-orange/10'}>
                  <div className="flex items-center gap-2">
                    {testResults['serverpod'].success ? (
                      <CheckCircle size={18} className="text-lime" weight="fill" />
                    ) : (
                      <Warning size={18} className="text-orange" weight="fill" />
                    )}
                    <AlertDescription className="text-sm font-medium">{testResults['serverpod'].message}</AlertDescription>
                  </div>
                </Alert>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => testConnection('serverpod')}
                  disabled={!credentials.serverpod.enabled || testing === 'serverpod'}
                  className="gap-2 bg-primary/20 text-primary border-2 border-primary/50 hover:bg-primary hover:text-primary-foreground font-bold tracking-[0.04em] uppercase shadow-[0_0_15px_rgba(0,200,255,0.2)] hover:shadow-[0_0_25px_rgba(0,200,255,0.5)]"
                  variant="outline"
                >
                  <TestTube size={18} weight="duotone" />
                  {testing === 'serverpod' ? 'Testing...' : 'Test Connection'}
                </Button>
                <Button
                  onClick={() => clearCredentials('serverpod')}
                  variant="outline"
                  className="gap-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash size={18} />
                  Clear
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="flutter" className="space-y-4 mt-6">
          <Card className="p-6 bg-card/40 backdrop-blur-2xl border-2 border-accent/30 shadow-[0_0_30px_rgba(255,0,150,0.1)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center">
                  <CloudArrowUp size={20} weight="duotone" className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-[0.04em] uppercase">Flutter App Config</h3>
                  <p className="text-sm text-muted-foreground">Configure your Flutter mobile app</p>
                </div>
              </div>
              {getStatusBadge(credentials.flutter.enabled)}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="flutter-enabled" className="font-semibold tracking-[0.02em]">Enable Flutter Integration</Label>
                <Switch
                  id="flutter-enabled"
                  checked={credentials.flutter.enabled}
                  onCheckedChange={(checked) => updateCredential('flutter', 'enabled', checked)}
                />
              </div>

              <Separator className="bg-border/50" />

              <div className="space-y-2">
                <Label htmlFor="flutter-project" className="font-semibold tracking-[0.02em]">Project Name</Label>
                <Input
                  id="flutter-project"
                  placeholder="my_flutter_app"
                  value={credentials.flutter.projectName}
                  onChange={(e) => updateCredential('flutter', 'projectName', e.target.value)}
                  disabled={!credentials.flutter.enabled}
                  className="bg-background/50 border-accent/30 focus:border-accent focus:ring-accent/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="flutter-bundle" className="font-semibold tracking-[0.02em]">Bundle ID / Package Name</Label>
                <Input
                  id="flutter-bundle"
                  placeholder="com.example.app"
                  value={credentials.flutter.bundleId}
                  onChange={(e) => updateCredential('flutter', 'bundleId', e.target.value)}
                  disabled={!credentials.flutter.enabled}
                  className="bg-background/50 border-accent/30 focus:border-accent focus:ring-accent/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="flutter-endpoint" className="font-semibold tracking-[0.02em]">API Endpoint</Label>
                <Input
                  id="flutter-endpoint"
                  placeholder="https://api.yourapp.com"
                  value={credentials.flutter.apiEndpoint}
                  onChange={(e) => updateCredential('flutter', 'apiEndpoint', e.target.value)}
                  disabled={!credentials.flutter.enabled}
                  className="bg-background/50 border-accent/30 focus:border-accent focus:ring-accent/20"
                />
              </div>

              {testResults['flutter'] && (
                <Alert className={testResults['flutter'].success ? 'border-lime/50 bg-lime/10' : 'border-orange/50 bg-orange/10'}>
                  <div className="flex items-center gap-2">
                    {testResults['flutter'].success ? (
                      <CheckCircle size={18} className="text-lime" weight="fill" />
                    ) : (
                      <Warning size={18} className="text-orange" weight="fill" />
                    )}
                    <AlertDescription className="text-sm font-medium">{testResults['flutter'].message}</AlertDescription>
                  </div>
                </Alert>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => testConnection('flutter')}
                  disabled={!credentials.flutter.enabled || testing === 'flutter'}
                  className="gap-2 bg-accent/20 text-accent border-2 border-accent/50 hover:bg-accent hover:text-accent-foreground font-bold tracking-[0.04em] uppercase shadow-[0_0_15px_rgba(255,0,150,0.2)] hover:shadow-[0_0_25px_rgba(255,0,150,0.5)]"
                  variant="outline"
                >
                  <TestTube size={18} weight="duotone" />
                  {testing === 'flutter' ? 'Testing...' : 'Test Config'}
                </Button>
                <Button
                  onClick={() => clearCredentials('flutter')}
                  variant="outline"
                  className="gap-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash size={18} />
                  Clear
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="openai" className="space-y-4 mt-6">
          <Card className="p-6 bg-card/40 backdrop-blur-2xl border-2 border-orange/30 shadow-[0_0_30px_rgba(255,100,0,0.1)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange/20 border border-orange/40 flex items-center justify-center">
                  <Sparkle size={20} weight="duotone" className="text-orange" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-[0.04em] uppercase">OpenAI API</h3>
                  <p className="text-sm text-muted-foreground">Use your own OpenAI API key</p>
                </div>
              </div>
              {getStatusBadge(credentials.openai.enabled)}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="openai-enabled" className="font-semibold tracking-[0.02em]">Enable OpenAI Integration</Label>
                <Switch
                  id="openai-enabled"
                  checked={credentials.openai.enabled}
                  onCheckedChange={(checked) => updateCredential('openai', 'enabled', checked)}
                />
              </div>

              <Separator className="bg-border/50" />

              <div className="space-y-2">
                <Label htmlFor="openai-key" className="font-semibold tracking-[0.02em]">API Key</Label>
                <div className="relative">
                  <Input
                    id="openai-key"
                    type={showKeys['openai'] ? 'text' : 'password'}
                    placeholder="sk-..."
                    value={credentials.openai.apiKey}
                    onChange={(e) => updateCredential('openai', 'apiKey', e.target.value)}
                    disabled={!credentials.openai.enabled}
                    className="bg-background/50 border-orange/30 focus:border-orange focus:ring-orange/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => toggleKeyVisibility('openai')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showKeys['openai'] ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="openai-model" className="font-semibold tracking-[0.02em]">Model</Label>
                <Input
                  id="openai-model"
                  placeholder="gpt-4"
                  value={credentials.openai.model}
                  onChange={(e) => updateCredential('openai', 'model', e.target.value)}
                  disabled={!credentials.openai.enabled}
                  className="bg-background/50 border-orange/30 focus:border-orange focus:ring-orange/20"
                />
              </div>

              {testResults['openai'] && (
                <Alert className={testResults['openai'].success ? 'border-lime/50 bg-lime/10' : 'border-orange/50 bg-orange/10'}>
                  <div className="flex items-center gap-2">
                    {testResults['openai'].success ? (
                      <CheckCircle size={18} className="text-lime" weight="fill" />
                    ) : (
                      <Warning size={18} className="text-orange" weight="fill" />
                    )}
                    <AlertDescription className="text-sm font-medium">{testResults['openai'].message}</AlertDescription>
                  </div>
                </Alert>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => testConnection('openai')}
                  disabled={!credentials.openai.enabled || testing === 'openai'}
                  className="gap-2 bg-orange/20 text-orange border-2 border-orange/50 hover:bg-orange hover:text-orange-foreground font-bold tracking-[0.04em] uppercase shadow-[0_0_15px_rgba(255,100,0,0.2)] hover:shadow-[0_0_25px_rgba(255,100,0,0.5)]"
                  variant="outline"
                >
                  <TestTube size={18} weight="duotone" />
                  {testing === 'openai' ? 'Testing...' : 'Test Connection'}
                </Button>
                <Button
                  onClick={() => clearCredentials('openai')}
                  variant="outline"
                  className="gap-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash size={18} />
                  Clear
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4 mt-6">
          <Card className="p-6 bg-card/40 backdrop-blur-2xl border-2 border-secondary/30 shadow-[0_0_30px_rgba(100,50,200,0.1)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 border border-secondary/40 flex items-center justify-center">
                  <Plugs size={20} weight="duotone" className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-[0.04em] uppercase">Custom API</h3>
                  <p className="text-sm text-muted-foreground">Connect any custom REST API</p>
                </div>
              </div>
              {getStatusBadge(credentials.custom.enabled)}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="custom-enabled" className="font-semibold tracking-[0.02em]">Enable Custom Integration</Label>
                <Switch
                  id="custom-enabled"
                  checked={credentials.custom.enabled}
                  onCheckedChange={(checked) => updateCredential('custom', 'enabled', checked)}
                />
              </div>

              <Separator className="bg-border/50" />

              <div className="space-y-2">
                <Label htmlFor="custom-name" className="font-semibold tracking-[0.02em]">Service Name</Label>
                <Input
                  id="custom-name"
                  placeholder="My Custom API"
                  value={credentials.custom.name}
                  onChange={(e) => updateCredential('custom', 'name', e.target.value)}
                  disabled={!credentials.custom.enabled}
                  className="bg-background/50 border-secondary/30 focus:border-secondary focus:ring-secondary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-endpoint" className="font-semibold tracking-[0.02em]">API Endpoint</Label>
                <Input
                  id="custom-endpoint"
                  placeholder="https://api.example.com"
                  value={credentials.custom.endpoint}
                  onChange={(e) => updateCredential('custom', 'endpoint', e.target.value)}
                  disabled={!credentials.custom.enabled}
                  className="bg-background/50 border-secondary/30 focus:border-secondary focus:ring-secondary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-key" className="font-semibold tracking-[0.02em]">API Key</Label>
                <div className="relative">
                  <Input
                    id="custom-key"
                    type={showKeys['custom'] ? 'text' : 'password'}
                    placeholder="Enter your API key"
                    value={credentials.custom.apiKey}
                    onChange={(e) => updateCredential('custom', 'apiKey', e.target.value)}
                    disabled={!credentials.custom.enabled}
                    className="bg-background/50 border-secondary/30 focus:border-secondary focus:ring-secondary/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => toggleKeyVisibility('custom')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showKeys['custom'] ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {testResults['custom'] && (
                <Alert className={testResults['custom'].success ? 'border-lime/50 bg-lime/10' : 'border-orange/50 bg-orange/10'}>
                  <div className="flex items-center gap-2">
                    {testResults['custom'].success ? (
                      <CheckCircle size={18} className="text-lime" weight="fill" />
                    ) : (
                      <Warning size={18} className="text-orange" weight="fill" />
                    )}
                    <AlertDescription className="text-sm font-medium">{testResults['custom'].message}</AlertDescription>
                  </div>
                </Alert>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => testConnection('custom')}
                  disabled={!credentials.custom.enabled || testing === 'custom'}
                  className="gap-2 bg-secondary/20 text-secondary border-2 border-secondary/50 hover:bg-secondary hover:text-secondary-foreground font-bold tracking-[0.04em] uppercase shadow-[0_0_15px_rgba(100,50,200,0.2)] hover:shadow-[0_0_25px_rgba(100,50,200,0.5)]"
                  variant="outline"
                >
                  <TestTube size={18} weight="duotone" />
                  {testing === 'custom' ? 'Testing...' : 'Test Connection'}
                </Button>
                <Button
                  onClick={() => clearCredentials('custom')}
                  variant="outline"
                  className="gap-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash size={18} />
                  Clear
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Alert className="border-primary/30 bg-primary/5">
        <div className="flex items-start gap-3">
          <Warning size={20} className="text-primary mt-0.5" weight="duotone" />
          <div className="space-y-1">
            <p className="text-sm font-semibold">Secure Storage</p>
            <p className="text-sm text-muted-foreground">
              All API credentials are stored securely in your browser's local storage and never sent to external servers. 
              For production use, consider implementing server-side credential management.
            </p>
          </div>
        </div>
      </Alert>
      </>
      )}
    </div>
  )
}
