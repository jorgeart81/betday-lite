import { DemoData } from '@/data/demo';

export async function GET() {
  return Response.json(DemoData.matchesToday, { status: 200 });
}
