import { AuthWrapper } from '@/components/Auth/AuthWrapper';
import { LoginComp } from '@/components/Auth/Login/LogInComp';

export default function LoginPage() {
  return (
    <AuthWrapper>
    <LoginComp/>
    </AuthWrapper>
  );
}
