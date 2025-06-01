import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => (
    {
      meta: [
        {
          name: 'description',
          content: 'Privacy first, modern temp email service.',
        },
        {
          title: 'Trash',
        },
      ],
      links: [
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ]
    }
  ),
})

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}