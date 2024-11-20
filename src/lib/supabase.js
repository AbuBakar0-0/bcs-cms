import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://dgrnvvstwgscitdmmxre.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRncm52dnN0d2dzY2l0ZG1teHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MjcwNjEsImV4cCI6MjA0NzQwMzA2MX0.sQi-Url0ef8ZkvaeiqFGtdJxW2lgotZG8YLYPe3JDEQ"
);
