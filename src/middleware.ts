// ลบหรือคอมเมนต์โค้ดที่เกี่ยวข้องกับ Clerk
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import type { NextFetchEvent, NextRequest } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AppConfig } from './utils/AppConfig';

// กำหนด intlMiddleware สำหรับการจัดการการตั้งค่าภาษา
const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

// กำหนด middleware function ของคุณ
export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

// กำหนด matcher สำหรับการใช้งาน middleware
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
