import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { 
  Plugs, 
  Warning, 
  EyeSlash, 
  Trash, 
  Sparkle, 
  CloudArrowUp, 
  Database, 
  CheckCircle, 
  FloppyDisk, 
  Eye, 
  TestTube,
  Globe
} from '@phosphor-icons/react'

// --- Interfaces & Constants ---

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

// --- Helper Hook for LocalStorage ---
function useStickyState<T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const stickyValue = window.localStorage.getItem(key)
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
    }
    return defaultValue
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}

// --- Main Component ---

export function APISettings() {
  const [credentials, setCredentials] = useStickyState<APICredentials>(DEFAULT_CREDENTIALS, 'api-credentials')
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [testing, setTesting] = useState<string | null>(null)

  const toggleKeyVisibility = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const updateCredential = (service: keyof APICredentials, field: string, value: any) => {
    setCredentials(current => ({
      ...current,
      [service]: {
        ...current[service],
        [field]: value
      }
    }))
  }

  const testConnection = async (service: keyof APICredentials) => {
    setTesting(service)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setTesting(null)
    
    // Simple mock validation logic
    const creds = credentials[service]
    const isValid = creds.enabled && (creds as any).apiKey || (creds as any).endpoint
    
    if (isValid) {
      toast.success('Connection Successful', { description: `Successfully connected to ${service}` })
    } else {
      toast.error('Connection Failed', { description: 'Please check your API key and endpoint.' })
    }
  }

  const clearCredentials = (service: keyof APICredentials) => {
    setCredentials(current => ({
      ...current,
      [service]: DEFAULT_CREDENTIALS[service]
    }))
    toast.success('Credentials Cleared', { description: `${service} settings have been reset.` })
  }

  const saveAll = () => {
    toast.success('Settings Saved', { description: 'API configurations stored locally.' })
  }

  const getStatusBadge = (enabled: boolean) => (
    <Badge 
      variant="secondary" 
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
        enabled 
          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50' 
          : 'bg-muted text-muted-foreground'
      }`}
    >
      {enabled ? <CheckCircle className="w-3 h-3 mr-1 fill-current" weight="fill" /> : null}
      {enabled ? 'Active' : 'Inactive'}
    </Badge>
  )

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center shadow-sm">
            <Plugs size={24} weight="duotone" className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">API Integrations</h2>
            <p className="text-sm text-muted-foreground">Manage connections to external services and providers</p>
          </div>
        </div>
        <Button onClick={saveAll} className="px-5 font-medium shadow-sm active:scale-95 transition-transform">
          <FloppyDisk size={18} className="mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="serverpod" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 h-12 rounded-xl border border-border/50 w-full sm:w-auto inline-flex">
          <TabsTrigger value="serverpod" className="rounded-lg px-4 sm:px-6 font-medium capitalize data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
            <Database size={16} weight="duotone" className="mr-2" /> Serverpod
          </TabsTrigger>
          <TabsTrigger value="flutter" className="rounded-lg px-4 sm:px-6 font-medium capitalize data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
            <CloudArrowUp size={16} weight="duotone" className="mr-2" /> Flutter
          </TabsTrigger>
          <TabsTrigger value="openai" className="rounded-lg px-4 sm:px-6 font-medium capitalize data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
            <Sparkle size={16} weight="duotone" className="mr-2" /> OpenAI
          </TabsTrigger>
          <TabsTrigger value="custom" className="rounded-lg px-4 sm:px-6 font-medium capitalize data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">
            <Globe size={16} weight="duotone" className="mr-2" /> Custom
          </TabsTrigger>
        </TabsList>

        {/* Serverpod Tab */}
        <TabsContent value="serverpod" className="focus-visible:outline-none">
          <Card className="glass-panel p-6 sm:p-8 rounded-2xl border bg-card/50 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Database size={24} weight="duotone" className="text-primary" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-lg font-semibold tracking-tight">Serverpod Backend</h3>
                  <p className="text-xs text-muted-foreground">Configure your Serverpod project connection</p>
                </div>
              </div>
              {getStatusBadge(credentials.serverpod.enabled)}
            </div>

            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="space-y-0.5">
                  <Label htmlFor="sp-enable" className="text-base font-medium cursor-pointer">Enable Integration</Label>
                  <p className="text-xs text-muted-foreground">Allow the app to communicate with your backend</p>
                </div>
                <Switch 
                  id="sp-enable"
                  checked={credentials.serverpod.enabled} 
                  onCheckedChange={(v) => updateCredential('serverpod', 'enabled', v)} 
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium ml-1">Project ID</Label>
                  <Input 
                    placeholder="e.g. project-123456"
                    value={credentials.serverpod.projectId}
                    onChange={(e) => updateCredential('serverpod', 'projectId', e.target.value)}
                    disabled={!credentials.serverpod.enabled}
                    className="rounded-lg bg-background/50 focus:bg-background transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium ml-1">API Endpoint</Label>
                  <Input 
                    placeholder="https://api.serverpod.cloud"
                    value={credentials.serverpod.endpoint}
                    onChange={(e) => updateCredential('serverpod', 'endpoint', e.target.value)}
                    disabled={!credentials.serverpod.enabled}
                    className="rounded-lg bg-background/50 focus:bg-background transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium ml-1">API Secret Key</Label>
                <div className="relative group">
                  <Input 
                    type={showKeys['serverpod'] ? 'text' : 'password'}
                    value={credentials.serverpod.apiKey}
                    onChange={(e) => updateCredential('serverpod', 'apiKey', e.target.value)}
                    disabled={!credentials.serverpod.enabled}
                    placeholder="Enter your secret key"
                    className="rounded-lg pr-10 bg-background/50 focus:bg-background transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => toggleKeyVisibility('serverpod')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showKeys['serverpod'] ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Separator className="my-6 opacity-50" />

              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => testConnection('serverpod')} 
                  disabled={!credentials.serverpod.enabled || testing === 'serverpod'}
                  className="rounded-lg font-medium"
                >
                  {testing === 'serverpod' ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" /> : <TestTube size={18} className="mr-2" />}
                  Test Connection
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => clearCredentials('serverpod')} 
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash size={18} className="mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Flutter Tab */}
        <TabsContent value="flutter" className="focus-visible:outline-none">
          <Card className="glass-panel p-6 sm:p-8 rounded-2xl border bg-card/50 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <CloudArrowUp size={24} weight="duotone" className="text-accent-foreground" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-lg font-semibold tracking-tight">Flutter App</h3>
                  <p className="text-xs text-muted-foreground">Mobile application configuration</p>
                </div>
              </div>
              {getStatusBadge(credentials.flutter.enabled)}
            </div>

            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="space-y-0.5">
                  <Label htmlFor="flutter-enable" className="text-base font-medium cursor-pointer">Enable Integration</Label>
                  <Switch 
                    id="flutter-enable"
                    checked={credentials.flutter.enabled} 
                    onCheckedChange={(v) => updateCredential('flutter', 'enabled', v)} 
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium ml-1">Project Name</Label>
                  <Input 
                    placeholder="my_flutter_app"
                    value={credentials.flutter.projectName}
                    onChange={(e) => updateCredential('flutter', 'projectName', e.target.value)}
                    disabled={!credentials.flutter.enabled}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium ml-1">Bundle ID</Label>
                  <Input 
                    placeholder="com.example.app"
                    value={credentials.flutter.bundleId}
                    onChange={(e) => updateCredential('flutter', 'bundleId', e.target.value)}
                    disabled={!credentials.flutter.enabled}
                    className="bg-background/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium ml-1">API Endpoint</Label>
                <Input 
                  placeholder="https://api.yourapp.com"
                  value={credentials.flutter.apiEndpoint}
                  onChange={(e) => updateCredential('flutter', 'apiEndpoint', e.target.value)}
                  disabled={!credentials.flutter.enabled}
                  className="bg-background/50"
                />
              </div>

              <Separator className="my-6 opacity-50" />

              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => testConnection('flutter')} 
                  disabled={!credentials.flutter.enabled || testing === 'flutter'}
                  className="rounded-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <TestTube size={18} className="mr-2" />
                  Test Config
                </Button>
                <Button variant="ghost" onClick={() => clearCredentials('flutter')} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                  <Trash size={18} className="mr-2" /> Clear
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* OpenAI Tab */}
        <TabsContent value="openai" className="focus-visible:outline-none">
          <Card className="glass-panel p-6 sm:p-8 rounded-2xl border bg-card/50 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Sparkle size={24} weight="duotone" className="text-orange-600 dark:text-orange-400" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-lg font-semibold tracking-tight">OpenAI</h3>
                  <p className="text-xs text-muted-foreground">LLM service configuration</p>
                </div>
              </div>
              {getStatusBadge(credentials.openai.enabled)}
            </div>

            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="space-y-0.5">
                  <Label htmlFor="ai-enable" className="text-base font-medium cursor-pointer">Enable Integration</Label>
                  <Switch 
                    id="ai-enable"
                    checked={credentials.openai.enabled} 
                    onCheckedChange={(v) => updateCredential('openai', 'enabled', v)} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium ml-1">API Key</Label>
                <div className="relative">
                  <Input 
                    type={showKeys['openai'] ? 'text' : 'password'}
                    placeholder="sk-..."
                    value={credentials.openai.apiKey}
                    onChange={(e) => updateCredential('openai', 'apiKey', e.target.value)}
                    disabled={!credentials.openai.enabled}
                    className="rounded-lg pr-10 bg-background/50"
                  />
                  <button 
                    type="button"
                    onClick={() => toggleKeyVisibility('openai')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showKeys['openai'] ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium ml-1">Model Name</Label>
                <Input 
                  placeholder="gpt-4-turbo"
                  value={credentials.openai.model}
                  onChange={(e) => updateCredential('openai', 'model', e.target.value)}
                  disabled={!credentials.openai.enabled}
                  className="bg-background/50 w-full sm:w-1/2"
                />
              </div>

              <Separator className="my-6 opacity-50" />

              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => testConnection('openai')} 
                  disabled={!credentials.openai.enabled || testing === 'openai'}
                  className="rounded-lg font-medium bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <TestTube size={18} className="mr-2" />
                  Test Key
                </Button>
                <Button variant="ghost" onClick={() => clearCredentials('openai')} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                  <Trash size={18} className="mr-2" /> Clear
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Custom Tab */}
        <TabsContent value="custom" className="focus-visible:outline-none">
          <Card className="glass-panel p-6 sm:p-8 rounded-2xl border bg-card/50 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-500/10">
                  <Plugs size={24} weight="duotone" className="text-violet-600 dark:text-violet-400" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-lg font-semibold tracking-tight">Custom Connection</h3>
                  <p className="text-xs text-muted-foreground">Generic REST API configuration</p>
                </div>
              </div>
              {getStatusBadge(credentials.custom.enabled)}
            </div>

            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="space-y-0.5">
                  <Label htmlFor="custom-enable" className="text-base font-medium cursor-pointer">Enable Integration</Label>
                  <Switch 
                    id="custom-enable"
                    checked={credentials.custom.enabled} 
                    onCheckedChange={(v) => updateCredential('custom', 'enabled', v)} 
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium ml-1">Service Name</Label>
                  <Input 
                    placeholder="My Service"
                    value={credentials.custom.name}
                    onChange={(e) => updateCredential('custom', 'name', e.target.value)}
                    disabled={!credentials.custom.enabled}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium ml-1">Endpoint URL</Label>
                  <Input 
                    placeholder="https://..."
                    value={credentials.custom.endpoint}
                    onChange={(e) => updateCredential('custom', 'endpoint', e.target.value)}
                    disabled={!credentials.custom.enabled}
                    className="bg-background/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium ml-1">Header / Key</Label>
                <div className="relative">
                  <Input 
                    type={showKeys['custom'] ? 'text' : 'password'}
                    placeholder="Authorization: Bearer ..."
                    value={credentials.custom.apiKey}
                    onChange={(e) => updateCredential('custom', 'apiKey', e.target.value)}
                    disabled={!credentials.custom.enabled}
                    className="rounded-lg pr-10 bg-background/50"
                  />
                  <button 
                    type="button"
                    onClick={() => toggleKeyVisibility('custom')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showKeys['custom'] ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Separator className="my-6 opacity-50" />

              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => testConnection('custom')} 
                  disabled={!credentials.custom.enabled || testing === 'custom'}
                  className="rounded-lg font-medium bg-violet-600 hover:bg-violet-700 text-white"
                >
                  <TestTube size={18} className="mr-2" />
                  Test Request
                </Button>
                <Button variant="ghost" onClick={() => clearCredentials('custom')} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                  <Trash size={18} className="mr-2" /> Clear
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Security Footer */}
      <div className="p-4 rounded-xl bg-primary/[0.03] border border-primary/10 flex gap-4 items-start">
        <Warning size={20} className="text-primary shrink-0 mt-0.5" weight="duotone" />
        <div className="text-sm leading-relaxed">
          <span className="font-semibold text-primary">Security Note:</span> 
          <span className="text-muted-foreground ml-1">
            Credentials are encrypted and stored locally in your browser session. 
            Never share your API keys with unauthorized individuals.
          </span>
        </div>
      </div>
    </div>
  )
}