'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@/components/ui';
import { getStoredAuth } from '@/features/auth/api';

type UserForm = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  enabled: boolean;
  temporary: boolean;
};

type UserRecord = {
  id: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  enabled?: boolean;
};

const emptyForm: UserForm = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  enabled: true,
  temporary: false,
};

export default function UsersManagementPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<UserForm>(emptyForm);

  const apiBase = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    [],
  );

  const getToken = () => {
    const auth = getStoredAuth();
    if (!auth || auth.expiresAt <= Date.now()) {
      router.replace('/login');
      return null;
    }
    return auth.accessToken;
  };

  const loadUsers = async () => {
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to load users (${res.status})`);
      }
      const data = (await res.json()) as UserRecord[];
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const handleCreate = async () => {
    const token = getToken();
    if (!token) {
      return;
    }
    setError(null);
    try {
      const res = await fetch(`${apiBase}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error(`Failed to create user (${res.status})`);
      }
      setForm(emptyForm);
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    }
  };

  const handleDelete = async (id: string) => {
    const token = getToken();
    if (!token) {
      return;
    }
    setError(null);
    try {
      const res = await fetch(`${apiBase}/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to delete user (${res.status})`);
      }
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  const startEdit = (user: UserRecord) => {
    setEditingId(user.id);
    setEditForm({
      username: user.username ?? '',
      email: user.email ?? '',
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      password: '',
      enabled: user.enabled ?? true,
      temporary: false,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) {
      return;
    }
    const token = getToken();
    if (!token) {
      return;
    }
    setError(null);
    try {
      const res = await fetch(`${apiBase}/users/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) {
        throw new Error(`Failed to update user (${res.status})`);
      }
      setEditingId(null);
      setEditForm(emptyForm);
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    }
  };

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" fontWeight={600}>
          User management
        </Typography>
        <Typography variant="body2" color="#6B778C">
          Create, update, and remove users from Keycloak.
        </Typography>
      </Box>

      {error ? (
        <Box sx={{ bgcolor: '#FFF4F4', color: '#AE2E24', p: 2, borderRadius: 2 }}>
          {error}
        </Box>
      ) : null}

      <Box sx={{ bgcolor: '#FFFFFF', p: 3, borderRadius: 2, boxShadow: '0 1px 2px rgba(9,30,66,0.15)' }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Create user
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2 }}>
          <TextField
            label="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="First name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <TextField
            label="Last name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.enabled}
                onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
              />
            }
            label="Enabled"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.temporary}
                onChange={(e) => setForm({ ...form, temporary: e.target.checked })}
              />
            }
            label="Temporary password"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleCreate}>
            Create user
          </Button>
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#FFFFFF', p: 3, borderRadius: 2, boxShadow: '0 1px 2px rgba(9,30,66,0.15)' }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Users
        </Typography>
        {loading ? (
          <Typography variant="body2">Loading users...</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {users.map((user) => (
              <Box
                key={user.id}
                sx={{
                  border: '1px solid #DFE1E6',
                  borderRadius: 2,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                  <Box>
                    <Typography fontWeight={600}>{user.username || user.email || 'User'}</Typography>
                    <Typography variant="body2" color="#6B778C">
                      {user.email || 'No email'} • {user.id}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined" onClick={() => startEdit(user)}>
                      Edit
                    </Button>
                    <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </Box>
                </Box>

                {editingId === user.id ? (
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2 }}>
                    <TextField
                      label="Username"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    />
                    <TextField
                      label="Email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                    <TextField
                      label="First name"
                      value={editForm.firstName}
                      onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                    />
                    <TextField
                      label="Last name"
                      value={editForm.lastName}
                      onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                    />
                    <TextField
                      label="Password"
                      type="password"
                      value={editForm.password}
                      onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                    />
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={editForm.enabled}
                            onChange={(e) => setEditForm({ ...editForm, enabled: e.target.checked })}
                          />
                        }
                        label="Enabled"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={editForm.temporary}
                            onChange={(e) => setEditForm({ ...editForm, temporary: e.target.checked })}
                          />
                        }
                        label="Temporary password"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="contained" onClick={handleUpdate}>
                        Save
                      </Button>
                      <Button variant="text" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : null}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
