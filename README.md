# CryptoMaster - Kripto Trading Simülatörü

Modern ve kullanıcı dostu bir kripto para trading simülatörü mobil uygulaması. React Native ve Expo ile geliştirilmiştir.

## 🚀 Özellikler

- **Giriş ve Kayıt Sistemi**: Supabase ile güvenli kimlik doğrulama
- **Canlı Piyasa Verileri**: WebSocket ile gerçek zamanlı fiyat güncellemeleri
- **Trading Simülasyonu**: Long/Short pozisyon açma, kaldıraçlı işlemler
- **Portföy Yönetimi**: Bakiye takibi, PnL hesaplamaları
- **Görevler ve Başarımlar**: Gamification özellikleri
- **Lider Tablosu**: Global sıralama sistemi
- **Profil ve Ayarlar**: Kullanıcı profil yönetimi

## 📱 Platform Desteği

- ✅ iOS
- ✅ Android
- ✅ Web (Expo Web)

## 🛠️ Teknolojiler

- **Framework**: React Native (Expo)
- **Navigasyon**: React Navigation
- **State Management**: React Hooks
- **Backend**: Supabase (Auth & Database)
- **Real-time**: WebSocket
- **UI Components**: Custom Components + Expo Vector Icons

## 📦 Kurulum

### Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go uygulaması (mobil cihazda)

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone https://github.com/YOUR_USERNAME/CryptoMaster.git
cd CryptoMaster/CryptoMasterApp
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Uygulamayı başlatın**
```bash
npm start
```

4. **Mobil cihazda test edin**
   - iOS: Expo Go uygulamasını açın ve QR kodu tarayın
   - Android: Expo Go uygulamasını açın ve QR kodu tarayın

## 🔧 Yapılandırma

### Environment Variables

`.env` dosyası oluşturun:

```env
EXPO_PUBLIC_API_URL=http://YOUR_SERVER_IP:3000
EXPO_PUBLIC_WS_URL=ws://YOUR_SERVER_IP:3000/ws
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Supabase Kurulumu

Backend API dokümantasyonuna bakın: `../endpoint.md`

## 📁 Proje Yapısı

```
CryptoMasterApp/
├── src/
│   ├── components/       # Yeniden kullanılabilir bileşenler
│   ├── constants/        # Sabitler ve tema
│   ├── navigation/       # Navigasyon yapılandırması
│   ├── screens/          # Ekranlar
│   │   ├── auth/         # Giriş/Kayıt ekranları
│   │   └── main/         # Ana uygulama ekranları
│   └── hooks/            # Custom React hooks
├── assets/               # Görseller ve ikonlar
├── App.tsx               # Ana uygulama giriş noktası
└── package.json
```

## 🎨 Tasarım Sistemi

Uygulama tutarlı bir renk paleti kullanır:

- **Primary**: `#25AFF4` (Cyan)
- **Accent**: `#6366F1` (Indigo)
- **Background Dark**: `#0F1923`
- **Success**: `#00D68F`
- **Danger**: `#FF4B4B`

Tüm renkler ve stil sabitleri `src/constants/theme.ts` dosyasında tanımlanmıştır.

## 📝 API Dokümantasyonu

Detaylı API dokümantasyonu için `../endpoint.md` dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje özel bir projedir.

## 👨‍💻 Geliştirici

CryptoMaster Development Team

---

**Not**: Bu proje bir simülatör uygulamasıdır. Gerçek para ile işlem yapmaz.

