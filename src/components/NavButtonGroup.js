import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

export default function NavButtonGroup() {
  return (
    <ButtonGroup>
      <Button type="button" href="/">
        Home
      </Button>
      <Button type="button" href="/yoga">
        Yoga
      </Button>
      <Button type="button" href="/meditation">
        Meditation
      </Button>
      <Button type="button" href="/mantra">
        Mantra
      </Button>
      <Button type="button" href="/blog">
        Blog
      </Button>
    </ButtonGroup>
  );
}
