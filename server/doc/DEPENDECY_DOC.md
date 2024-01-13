
# Dokumentacja Zależności Projektu "controller-chronicles-api"

## Wersja
- **Wersja**: 0.0.1

## Plik źródłowy

Zleżności projektu znajdują się 

### Zależności Podstawowe (`dependencies`)

- `@nestjs/*`: Różne moduły NestJS zapewniające podstawową funkcjonalność frameworka, w tym `@nestjs/common`, `@nestjs/core` oraz integracje z takimi narzędziami jak `@nestjs/jwt`, `@nestjs/passport`, `@nestjs/mongoose`.
- `axios`: Wykorzystywany do wykonywania zapytań HTTP.
- `bcrypt`: Służy do haszowania haseł.
- `class-transformer` i `class-validator`: Używane do transformacji i walidacji danych klas.
- `cookie-parser`: Middleware do parsowania cookies.
- `date-fns`: Biblioteka do obsługi dat.
- `dotenv`: Zarządzanie zmiennymi środowiskowymi.
- `ejs`: Silnik szablonów do generowania emaili.
- `mongoose`: ODM do MongoDB.
- `passport`, `passport-jwt`, `passport-local`: Strategie uwierzytelniania.
- `puppeteer`: Narzędzie do automatyzacji przeglądarek.
- `reflect-metadata`: Umożliwia wykorzystanie metadanych w TypeScript.
- `rxjs`: Biblioteka do programowania reaktywnego.
- `spotify-web-api-node`: Integracja z API Spotify.

### Zależności Rozwojowe (`devDependencies`)

- `@nestjs/cli` i `@nestjs/testing`: Narzędzia do tworzenia i testowania aplikacji NestJS.
- `@typescript-eslint/*`: Narzędzia ESLint dla TypeScript.
- `jest` i `ts-jest`: Narzędzia do testowania.
- `prettier` i `eslint-plugin-prettier`: Narzędzia do formatowania kodu.
- `supertest`: Biblioteka do testowania HTTP.
- `typescript`: Język programowania używany w projekcie.

### Skrypty

- `build`, `start*`: Skrypty do budowania i uruchamiania aplikacji.
- `lint`: Lintowanie kodu.
- `test*`: Skrypty do testowania aplikacji.

### Konfiguracja Jest

- Ustawienia konfiguracyjne dla frameworka testowego Jest.
