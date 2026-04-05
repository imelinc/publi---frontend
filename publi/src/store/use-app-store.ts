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

interface AppStore {
  accounts: Account[];
  posts: Post[];
  addPost: (post: Post) => void;
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
}));