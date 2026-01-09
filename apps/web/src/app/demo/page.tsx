'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  Chip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import { ModeSwitcher } from '@/design-system/ThemeRegistry';

interface IssueCard {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

const mockIssues: Record<string, IssueCard[]> = {
  todo: [
    {
      id: '1',
      title: 'Implement user authentication',
      description: 'Add login and registration functionality',
      assignee: 'JD',
      tags: ['backend', 'auth'],
      priority: 'high',
    },
    {
      id: '2',
      title: 'Design landing page',
      description: 'Create mockups for the homepage',
      assignee: 'AB',
      tags: ['design', 'frontend'],
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Setup CI/CD pipeline',
      tags: ['devops'],
      priority: 'low',
    },
  ],
  inProgress: [
    {
      id: '4',
      title: 'Refactor database schema',
      description: 'Optimize table structure for better performance',
      assignee: 'CD',
      tags: ['backend', 'database'],
      priority: 'high',
    },
    {
      id: '5',
      title: 'Write unit tests',
      description: 'Coverage for core modules',
      assignee: 'EF',
      tags: ['testing'],
      priority: 'medium',
    },
  ],
  done: [
    {
      id: '6',
      title: 'Setup project structure',
      description: 'Initialize Next.js and MUI',
      assignee: 'GH',
      tags: ['setup'],
      priority: 'low',
    },
    {
      id: '7',
      title: 'Configure ESLint',
      tags: ['tooling'],
      priority: 'low',
    },
  ],
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    default:
      return 'default';
  }
};

export default function DemoPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'var(--ds-palette-background-default)',
      }}
    >
      {/* Top Bar */}
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '12px 24px',
          borderRadius: 0,
          borderBottom: '1px solid var(--ds-palette-divider)',
          backgroundColor: 'var(--ds-palette-background-paper)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, flexShrink: 0 }}>
          Jira Clone Demo
        </Typography>
        <TextField
          placeholder="Search issues..."
          size="small"
          sx={{
            flexGrow: 1,
            maxWidth: 400,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'var(--ds-palette-background-default)',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 20, color: 'var(--ds-palette-text-secondary)' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            flexShrink: 0,
            textTransform: 'none',
          }}
        >
          Create
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          <ModeSwitcher />
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'var(--ds-palette-primary-main)' }}>
            <PersonIcon />
          </Avatar>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <Drawer
          variant="persistent"
          open={sidebarOpen}
          sx={{
            width: sidebarOpen ? 240 : 0,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              borderRight: '1px solid var(--ds-palette-divider)',
              backgroundColor: 'var(--ds-palette-background-paper)',
            },
          }}
        >
          <List sx={{ paddingTop: 2 }}>
            <ListItem disablePadding>
              <ListItemButton selected>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: 'var(--ds-palette-primary-main)' }} />
                </ListItemIcon>
                <ListItemText primary="Board" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FolderIcon sx={{ color: 'var(--ds-palette-text-secondary)' }} />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon sx={{ color: 'var(--ds-palette-text-secondary)' }} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content - Kanban Board */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            gap: 2,
            padding: 3,
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
        >
          {[
            { key: 'todo', title: 'To Do', count: mockIssues.todo.length },
            { key: 'inProgress', title: 'In Progress', count: mockIssues.inProgress.length },
            { key: 'done', title: 'Done', count: mockIssues.done.length },
          ].map((column) => (
            <Box
              key={column.key}
              sx={{
                minWidth: 300,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: 'var(--ds-palette-text-primary)',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                  }}
                >
                  {column.title}
                </Typography>
                <Chip
                  label={column.count}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '11px',
                    backgroundColor: 'var(--ds-palette-background-default)',
                    color: 'var(--ds-palette-text-secondary)',
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  flex: 1,
                  overflowY: 'auto',
                  paddingBottom: 2,
                }}
              >
                {mockIssues[column.key as keyof typeof mockIssues].map((issue) => (
                  <Paper
                    key={issue.id}
                    elevation={0}
                    sx={{
                      padding: 2,
                      cursor: 'pointer',
                      border: '1px solid var(--ds-palette-divider)',
                      backgroundColor: 'var(--ds-palette-background-paper)',
                      transition: 'all 150ms',
                      '&:hover': {
                        boxShadow: '0 2px 4px rgba(9, 30, 66, 0.08)',
                        borderColor: 'var(--ds-palette-primary-main)',
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: 'var(--ds-palette-text-primary)',
                        marginBottom: 1,
                      }}
                    >
                      {issue.title}
                    </Typography>
                    {issue.description && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'var(--ds-palette-text-secondary)',
                          fontSize: '12px',
                          display: 'block',
                          marginBottom: 1.5,
                        }}
                      >
                        {issue.description}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 1.5,
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {issue.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '11px',
                              backgroundColor: 'var(--ds-palette-background-default)',
                              color: 'var(--ds-palette-text-secondary)',
                              border: '1px solid var(--ds-palette-divider)',
                            }}
                          />
                        ))}
                        <Chip
                          label={issue.priority}
                          size="small"
                          color={getPriorityColor(issue.priority) as 'error' | 'warning' | 'default'}
                          sx={{
                            height: 20,
                            fontSize: '11px',
                          }}
                        />
                      </Box>
                      {issue.assignee && (
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            fontSize: '11px',
                            bgcolor: 'var(--ds-palette-primary-main)',
                          }}
                        >
                          {issue.assignee}
                        </Avatar>
                      )}
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

