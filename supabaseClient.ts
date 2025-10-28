import { createClient, SupabaseClient } from '@supabase/supabase-js';

// هام: تم تحديث عنوان URL. الآن، استبدل القيمة التالية بمفتاح anon الخاص بك.
// يمكنك الحصول عليها من إعدادات مشروع Supabase > API > Project API Keys > anon public
const supabaseUrl = 'https://vjivjbygjpxetbozjlmi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqaXZqYnlnanB4ZXRib3pqbG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDUxOTksImV4cCI6MjA3NzE4MTE5OX0.8w1jd_2SOojVwLfGtVuYiiKiKfJlDe_a__Wy64Q7lBY';

// التحقق مما إذا كانت بيانات الاتصال موجودة بالفعل
// The placeholder key is used to determine if the connection should be established.
// FIX: Cast supabaseKey to string to avoid TypeScript error about comparing two different string literals.
export const isSupabaseConnected = (supabaseKey as string) !== 'INSERT_YOUR_SUPABASE_ANON_KEY_HERE';

let supabase: SupabaseClient;

if (isSupabaseConnected) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.error("خطأ في تهيئة Supabase. تأكد من صحة البيانات:", error);
    // @ts-ignore
    supabase = {}; 
  }
} else {
  // رسالة تحذيرية للمطور لتذكيره بتحديث البيانات
  // FIX: Cast supabaseKey to string to avoid TypeScript error about comparing two different string literals.
  if ((supabaseKey as string) === 'INSERT_YOUR_SUPABASE_ANON_KEY_HERE') {
    console.warn(`
      ********************************************************************************
      *  تنبيه: بيانات Supabase غير مكتملة!                                          *
      *  الرجاء فتح ملف 'supabaseClient.ts' وتحديث 'supabaseKey'.                    *
      *  سيستمر التطبيق باستخدام البيانات المحلية المؤقتة حتى يتم التحديث.        *
      ********************************************************************************
    `);
  }
  // This placeholder avoids crashing the app.
  // @ts-ignore
  supabase = {};
}

export { supabase };