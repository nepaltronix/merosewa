import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>
          <CardTitle>Hello!</CardTitle>
          <CardDescription>How are you?</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the Home Page.</p>
        </CardContent>
      </Card>
    </main>
  );
}
