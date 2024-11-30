import TipsRestaurants from 'components/admin/TipsRestaurants';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  return (
    <div>
      <TipsRestaurants />
    </div>
  );
}
