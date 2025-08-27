import { Inter, Lusitana } from 'next/font/google'; // NextJSのフォントヘルパーを使用する

export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'] }); // Google FontsからLusitanaフォントをインポート