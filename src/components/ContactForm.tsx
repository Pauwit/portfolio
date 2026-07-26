import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldError, FieldGroup } from '@/components/ui/field';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  // Honeypot: real visitors never fill this in; bots typically do.
  company: z.string().max(0, 'Spam detected').optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm({ formspreeEndpoint }: { formspreeEndpoint: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const { control, handleSubmit, reset, register } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '', company: '' },
  });

  async function onSubmit(values: ContactFormValues) {
    if (values.company) return; // honeypot tripped, silently drop
    setStatus('sending');
    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, message: values.message }),
      });
      if (res.ok) {
        setStatus('sent');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return <p className="text-foreground/70">Thanks — your message is on its way. I'll get back to you soon.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register('company')} />

      <FieldGroup>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input {...field} id={field.name} aria-invalid={fieldState.invalid} autoComplete="name" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input {...field} id={field.name} type="email" aria-invalid={fieldState.invalid} autoComplete="email" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="message"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Message</FieldLabel>
              <Textarea {...field} id={field.name} aria-invalid={fieldState.invalid} className="min-h-32" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field orientation="horizontal">
          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </Button>
          {status === 'error' && <p className="text-sm text-accent">Something went wrong. Please try again.</p>}
        </Field>
      </FieldGroup>
    </form>
  );
}
