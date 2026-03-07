import BoardTabs from '@/features/board/BoardTabs';
import { Box } from '@/components/ui';

type Props = { params: { boardId: string } };

export default function BoardPage({ params }: Props) {
  return (
    <Box>
      <BoardTabs boardId={params.boardId} />
    </Box>
  );
}
