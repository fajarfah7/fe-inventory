import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CardWrapper({ title, children }: { title: string, children: React.ReactNode}) {
  return (
    <>
      <Card className="md:w-2xl">
        <CardHeader className="text-center">
          <CardTitle>{ title }</CardTitle>
        </CardHeader>
        <CardContent>
          { children }
        </CardContent>
      </Card>
    </>
  );
};