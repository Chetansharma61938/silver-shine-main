
export function Logo({ className = '' }: { className?: string }) {
  return (
    <img 
      src="https://eablzgdjbiussgtrcwkp.supabase.co/storage/v1/object/public/assets/logo.png" 
      alt="Silver Shine Chassis" 
      className={`h-8 ${className}`}
    />
  );
}