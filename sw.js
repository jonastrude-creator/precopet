/* Service worker mínimo do PrecoPet — apenas habilita a
   instalação como app. Não faz cache agressivo para garantir
   que preços e cupons estejam sempre atualizados. */
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());
self.addEventListener('fetch', e => { /* rede sempre — dados frescos */ });
