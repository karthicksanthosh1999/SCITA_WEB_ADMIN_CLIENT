'use client'

import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { api } from "@/lib/axiosInstances";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Eye, EyeClosed } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { push } = useRouter();
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: ""});

  const handleLogin:FormEventHandler<HTMLInputElement> = async(event) => {
    event.preventDefault()
    const response = await api.post('/api/auth/login', loginData);
    if(response?.data?.success){
      push('/dashboard');
      toast.success("User login successfully")
    }
  };

  const handleChange:ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;
    setLoginData((preV) => ({...preV, [name]: value}));
  }

  const toggleEyeOpen = () => {
    setIsEyeOpen((preV) => !preV)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={loginData.email}
                  name="email"
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={isEyeOpen ? "text" : "password"} 
                    value={loginData.password}
                    name="password"
                    onChange={handleChange} 
                    required 
                    />
                  <button type="button" className="absolute top-1/5 right-3" onClick={toggleEyeOpen}>{isEyeOpen ? <Eye size={20}/> : <EyeClosed size={20} />}</button>
                </div>
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              width={100}
              height={100}
            />
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}
