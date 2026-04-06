import { create } from "zustand";

export type PostStatus = "programada" | "publicada" | "fallida";

export interface Post {
  id: string;
  caption: string;
  imageUrl: string;
  scheduledAt: Date;
  status: PostStatus;
  account: string;
}

export interface Account {
  id: string;
  username: string;
  avatarUrl: string;
  platform: "instagram";
}

export interface Client {
  id: string;
  name: string;
  avatarUrl: string;
  platform: "instagram" | "facebook" | "linkedin" | "tiktok" | "x";
  username: string;
  postsCount: number;
  nextPost: Date | null;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  joinedAt: Date;
}

interface AppStore {
  accounts: Account[];
  clients: Client[];
  profile: UserProfile;
  posts: Post[];
  addPost: (post: Post) => void;
  deletePost: (id: string) => void;
  addClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  accounts: [
    {
      id: "1",
      username: "@cafeelmolino",
      avatarUrl: "https://i.pravatar.cc/40?img=1",
      platform: "instagram",
    },
    {
      id: "2",
      username: "@studiolucia",
      avatarUrl: "https://i.pravatar.cc/40?img=5",
      platform: "instagram",
    },
  ],
  clients: [
    {
      id: "1",
      name: "Café El Molino",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=CafeElMolino",
      platform: "instagram",
      username: "@cafeelmolino",
      postsCount: 3,
      nextPost: new Date(Date.now() + 1000 * 60 * 60 * 2),
    },
    {
      id: "2",
      name: "Studio Lucía",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=StudioLucia",
      platform: "instagram",
      username: "@studiolucia",
      postsCount: 5,
      nextPost: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  ],
  profile: {
    name: "Ignacio Melinc",
    email: "ignacio@publi.com",
    role: "Community Manager Freelance",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Ignacio",
    joinedAt: new Date("2025-01-15"),
  },
  posts: [
    {
      id: "1",
      caption: "¡Nueva colección disponible! 🎉",
      imageUrl: "https://picsum.photos/seed/post1/400/400",
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 2),
      status: "programada",
      account: "@cafeelmolino",
    },
    {
      id: "2",
      caption: "Detrás de escena de nuestro último shoot 📸",
      imageUrl: "https://picsum.photos/seed/post2/400/400",
      scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: "publicada",
      account: "@studiolucia",
    },
  ],
  addPost: (post) =>
    set((state) => ({ posts: [...state.posts, post] })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  addClient: (client) =>
    set((state) => ({ clients: [...state.clients, client] })),
  deleteClient: (id) =>
    set((state) => ({ clients: state.clients.filter((client) => client.id !== id) })),
  updateProfile: (profile) =>
    set((state) => ({ profile: { ...state.profile, ...profile } })),
}));
