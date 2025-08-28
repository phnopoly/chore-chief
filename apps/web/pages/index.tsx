import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  HStack,
  VStack,
  Badge,
  Button,
  Card,
  HoverCard,
  Separator,
} from "@chakra-ui/react";

type Owner = "Dad" | "Mom" | "Phong" | "Raj";
type Freq = "Daily" | "Weekly" | "Monthly";
type Cell = { date: string; value: number };

const chores = [
  { id: "c1", name: "Dishes", freq: "Daily" as Freq, owner: "Phong" as Owner },
  { id: "c2", name: "Laundry", freq: "Weekly" as Freq, owner: "Mom" as Owner },
  { id: "c3", name: "Vacuum", freq: "Weekly" as Freq, owner: "Dad" as Owner },
  { id: "c4", name: "Lawn Care", freq: "Weekly" as Freq, owner: "Raj" as Owner },
  { id: "c5", name: "Bathrooms", freq: "Weekly" as Freq, owner: "Phong" as Owner },
  { id: "c6", name: "Fridge Cleanout", freq: "Monthly" as Freq, owner: "Mom" as Owner },
];

const ownersColor: Record<Owner, string> = {
  Dad: "blue",
  Mom: "purple",
  Phong: "teal",
  Raj: "orange",
};

// deterministic hash → 0..5
const scoreForDate = (iso: string) => {
  let h = 0;
  for (let i = 0; i < iso.length; i++) h = (h * 31 + iso.charCodeAt(i)) | 0;
  const v = Math.abs(h) % 6;
  return v;
};

const lastNDays = (n: number): Cell[] => {
  const today = new Date();
  // normalize to YYYY-MM-DD in local tz for stability
  const y = today.getFullYear(),
    m = today.getMonth(),
    d = today.getDate();
  const base = new Date(y, m, d);
  const out: Cell[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const dt = new Date(base);
    dt.setDate(base.getDate() - i);
    const iso = dt.toISOString().slice(0, 10);
    out.push({ date: iso, value: scoreForDate(iso) });
  }
  return out;
};

const scale = (v: number) => {
  const shades = ["gray.200", "green.50", "green.100", "green.200", "green.300", "green.400"];
  return shades[Math.max(0, Math.min(5, v))];
};

const HeatmapGrid: React.FC<{ cells: Cell[] }> = ({ cells }) => (
  <SimpleGrid columns={7} gap={1}>
    {cells.map((c) => (
      <HoverCard.Root key={c.date}>
        <HoverCard.Trigger>
          <Box
            role="button"
            aria-label={`heatmap cell ${c.date}`}
            w={6}
            h={6}
            rounded="md"
            borderWidth="1px"
            borderColor="gray.200"
            bg={scale(c.value)}
          />
        </HoverCard.Trigger>
        <HoverCard.Content>
          {c.date} • score {c.value}
        </HoverCard.Content>
      </HoverCard.Root>
    ))}
  </SimpleGrid>
);

const Home: React.FC = () => {
  const cells = React.useMemo(() => lastNDays(35), []);
  return (
    <Container maxW="6xl" py={10} bg="gray.50" minH="100vh">
      <Stack gap={8}>
        <VStack align="start" gap={2}>
          <Heading as="h1" size="xl">
            Chore Champ Dashboard
          </Heading>
          <Text color="gray.600">Snapshot of chores, owners, and recent completion intensity.</Text>
        </VStack>

        <SimpleGrid columns={[1, 1, 3]} gap={6}>
          <Card.Root>
            <Card.Header pb={2}>
              <Heading size="md">This Week</Heading>
              <Text color="gray.600" mt={1}>
                Who owns what
              </Text>
            </Card.Header>
            <Card.Body pt={0}>
              <Stack gap={3}>
                {chores.map((c) => (
                  <HStack key={c.id} justify="space-between">
                    <Text fontWeight="medium">{c.name}</Text>
                    <HStack gap={2}>
                      <Badge colorScheme={ownersColor[c.owner]}>{c.owner}</Badge>
                      <Badge variant="subtle">{c.freq}</Badge>
                    </HStack>
                  </HStack>
                ))}
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Header pb={2}>
              <Heading size="md">Heatmap (Last 5 Weeks)</Heading>
              <Text color="gray.600" mt={1}>
                Higher intensity = more done
              </Text>
            </Card.Header>
            <Card.Body pt={2}>
              <HeatmapGrid cells={cells} />
              <Separator my={4} />
              <HStack gap={2} align="center">
                <Text fontSize="sm" color="gray.600">
                  Legend:
                </Text>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <Box key={n} w={5} h={5} rounded="sm" bg={scale(n)} borderWidth="1px" />
                ))}
              </HStack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Header pb={2}>
              <Heading size="md">Quick Actions</Heading>
              <Text color="gray.600" mt={1}>
                Plan, assign, review
              </Text>
            </Card.Header>
            <Card.Body pt={2}>
              <Stack gap={3}>
                <Button colorScheme="teal">Add New Chore</Button>
                <Button colorScheme="blue" variant="outline">
                  Assign To Person
                </Button>
                <Button colorScheme="purple" variant="outline">
                  Set Frequency
                </Button>
                <Button colorScheme="orange" variant="ghost">
                  Export Weekly Plan
                </Button>
              </Stack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default Home;
