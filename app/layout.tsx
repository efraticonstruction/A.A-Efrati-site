export const metadata = {
  title: 'א.א אפרתי - שיפוצים וגמר',
  description: 'עבודות גמר ושיפוצים ברמה הגבוהה ביותר',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
