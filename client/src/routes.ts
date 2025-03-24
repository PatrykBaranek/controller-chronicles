import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  layout('./Layout.tsx', [
    index('./pages/Home.tsx', { id: 'home' }),

    route('/login', './pages/Login.tsx'),
    route('/signup', './pages/SignUp.tsx'),
    route('/reset-password', './pages/ResetPassword.tsx'),

    ...prefix('profile', [
      index('./pages/Profile.tsx'),
      route('/collections', './pages/Collections.tsx'),
    ]),

    ...prefix('games', [
      index('./pages/Games.tsx'),
      route(':id', './pages/GameDetails.tsx', { id: 'gameDetails' }),
    ]),

    ...prefix('podcasts', [
      index('./pages/Podcasts.tsx'),
      route(':id', './pages/PodcastDetails.tsx'),
    ]),
  ]),
] satisfies RouteConfig;