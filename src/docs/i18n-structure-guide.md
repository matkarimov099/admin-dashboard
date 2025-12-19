# 🌍 Xalqarolashtirish (i18n) Strukturasi Qo'llanmasi

## 📋 Asosiy Prinsiplar

### 1. **Modullashtirilgan Tuzilma**
Har bir feature alohida bo'limda joylashgan:
```
src/locales/{til}/features/{modul-nomi}.json
```

### 2. **Standart JSON Tuzilmasi**
Har bir module uchun quyidagi strukturdan foydalaning:

```json
{
  "{module}": {
    "fields": {
      "{field-name}": {
        "label": "Ko'rsatuvchi matn",
        "placeholder": "Plaseholder matn",
        "validation": {
          "required": "Maydon majburiy",
          "minLength": "Minimal uzunlik: {{min}} ta belgi"
        }
      }
    },
    "actions": {
      "actionName": "Amal nomi"
    },
    "info": {
      "infoName": "Informatsiya matni"
    },
    "error": {
      "errorName": "Xatolik matni"
    },
    "success": {
      "successName": "Muvaffaqiyat matni"
    }
  }
}
```

## 🎯 Amaliy Misollar

### ✅ **Auth Module** (tayyor)
- Form fields: username, password
- Actions: login, register, forgotPassword
- Validations: required, minLength, invalid

### 🔄 **Tasks Module** (qo'llash kerak)
- Fields: title, description, status, priority, deadline
- Actions: create, edit, delete, assign, complete
- Status: todo, inProgress, done

### 📊 **Dashboard Module** (qo'llash kerak)
- KPICards, charts, statistics
- Filter options, sorting

### 👥 **Users Module** (qo'llash kerak)
- Profile information, user management
- Role assignments

## 🚀 Foydalanish Misollari

### React Component:
```tsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();

  return (
    <form>
      <input placeholder={t('auth.username.placeholder')} />
      <button>{t('auth.actions.login')}</button>
    </form>
  );
};
```

### Zod Schema:
```tsx
import type { TFunction } from 'i18next';

const createSchema = (t: TFunction) => z.object({
  username: z.string().min(1, t('auth.username.validation.required'))
});
```

## 🔍 Qiymatli Tarjimalar (Interpolation)

Dinamik qiymatlar uchun {{variable}} sintaksisidan foydalaning:

```json
{
  "validation": {
    "minLength": "Minimal uzunlik: {{min}} ta belgi"
  }
}
```

Foydalanish:
```tsx
t('auth.username.validation.minLength', { min: 3 })
// Natija: "Minimal uzunlik: 3 ta belgi"
```

## 📝 Eng Muhim Qoidalarning

1. **Tillar soni**: 4 ta til (uz, uz-cyrl, en, ru)
2. **Konsistensiya**: Barcha tillarda bir xil kalitlar
3. **Modulatsiya**: Har bir module alohida bo'lim
4. **Validatsiya**: Barcha xatolik xabarlari tarjima qilishi kerak