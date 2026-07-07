import { LogoutButton } from '@/components/logout-button';
import React from 'react'
import { UserProps } from '../page';

export default function Dashboard(user: UserProps) {
    return (
  <div>
    <h1>Hello {user?.firstName}</h1>
    <LogoutButton />
  </div>);
}
