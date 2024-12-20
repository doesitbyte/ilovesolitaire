export const HomeContent = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Play Solitaire Online</h1>
      <p>
        Solitaire, also known as Klondike, is a single-player game, and the most
        popular version requires you to move and arrange cards into piles. This
        game only involves a standard deck of 52 playing cards and no opponent
        to play with. With over 500 variations of Solitaire games available,
        most are minor variations of the original. The variations involve
        changes in layout to pairing or totaling rules. The base Solitaire game
        consists of moving the cards into piles of identical suits.
      </p>
      <p>
        The popular variations of the classic Solitaire are{" "}
        <a href="https://ilovesolitaire.com/spider/">Spider Solitaire</a> and{" "}
        <a href="https://ilovesolitaire.com/freecell/">FreeCell</a>.
      </p>
      <h3>
        <strong>Objective</strong>
      </h3>
      <p>
        The goal of Solitaire is to build four (4) piles, each representing a
        suit - Heart (<span className="text-red-500">&hearts;️</span>) , Spade
        (&spades;️) ️, Diamond (<span className="text-red">&diams;️</span>), and
        Club (&clubs;️). Also, you need to stack cards in each pile in ascending
        order - from Ace to King. To win the game, you need to move and place
        all the cards into separate piles, each by suit, in the Foundation area.
      </p>
      <h3>
        <strong>Game Setup</strong>
      </h3>
      <p>
        You get a layout divided into four areas - Foundation, Tableau,
        Stockpile and Discard.
      </p>
      <p>
        While the play involves a standard deck of 52 playing cards, the{" "}
        <em>Tableau</em> area has seven columns consisting of 28 cards.
      </p>
      <p>
        From the left to right, the first column has only one card facing up.
        The second column to the left of the first has two cards - the first
        facing down and the second facing up. Next, the third column to the left
        of the second has three cards - two facing down and the third one facing
        up.&nbsp;
      </p>
      <p>
        A similar repetition continues in the fourth to the seventh column,
        where a corresponding number of cards face down, and only the top card
        faces up. The remaining 24 cards are part of the Stockpile above the
        seven columns.
      </p>
      <p>
        Before the game begins, the <em>Foundation</em> area and{" "}
        <em>Discard</em> pile are empty.
      </p>
      <h3>
        <strong>Rules</strong>
      </h3>
      <ul className="list-disc">
        <li>
          Aces need to be at the bottom of the pile in the <em>Foundation</em>{" "}
          area.
        </li>
        <li>
          Kings can be used in the empty column to start a new stack in the{" "}
          <em>Tableau</em> area.
        </li>
      </ul>
      <p>
        <strong>Foundation Area:</strong>
      </p>
      <ul className="list-disc">
        <li>
          In the <em>Foundation</em> area, each pile needs to have the same suit
          of cards and each pile needs to begin with an Ace and end with a King.
        </li>
        <li>
          Three ways to put cards in a <em>Foundation</em> pile: move a card
          from a column in the <em>Tableau</em> area, from the <em>Discard</em>{" "}
          file (only the top card facing up), or the card you draw from the
          Stockpile.&nbsp;
        </li>
      </ul>
      <p>
        <strong>Tableau Area:</strong>
      </p>
      <ul className="list-disc">
        <li>
          You can only move the cards facing up in the columns of the{" "}
          <em>Tableau</em> area.
        </li>
        <li>
          When moving cards between columns in the <em>Tableau</em> area, the
          cards must alternate between red and black colors of different suits
          in descending order. For example, you can move and put 10 of Clubs on
          Jack of Hearts visible in another column.
        </li>
        <li>
          You can move a stack of cards to another column only if they are of
          the correct descending order and alternative color of black and red.
          That&rsquo;s only allowed if the bottom-most card of the stack is
          lower than the destination card. For example, you can only move a
          stack that has the Queen of Hearts at the bottom to a column with King
          of Clubs or Spades.
        </li>
        <li>
          When you get an empty column, you can place a King to start a new
          column or move an entire sequential stack with the King as the highest
          (bottom-most) card in a column.
        </li>
        <li>
          You can reveal turn cards facing down only when you move the card
          facing up above it to another column.&nbsp;
        </li>
      </ul>
      <p>
        <strong>Stockpile:</strong>
      </p>
      <ul className="list-disc">
        <li>
          Use the Stockpile only when no suitable cards are available to move in
          the column of the <em>Tableau</em> area.
        </li>
        <li>You can draw only one card from the Stockpile at a time.&nbsp;</li>
        <li>
          You can do three things with the card you pick from the Stockpile:
          <ol>
            <li>
              Place it in a column of the <em>Tableau</em> area in descending
              order. For example, you can put 7 of Spades on top of a stack with
              8 of Hearts face up.
            </li>
            <li>
              Put it directly on a matching suit pile in ascending order of the
              <em> Foundation</em> Area. For instance, you may place 4 of
              Diamonds on top of 3 of Diamonds.&nbsp;
            </li>
            <li>
              If it doesn&apos;t fit in a <em>Tableau</em> area column or a{" "}
              <em>Foundation </em>pile, put it face up on the Discard
              pile.&nbsp;
            </li>
          </ol>
        </li>
      </ul>
      <p>
        <strong>Discard Pile:</strong>
      </p>
      <ul className="list-disc">
        <li>
          You can only move the top (face up) card from the Discard pile into a
          column in the <em>Tableau</em> area or a pile in the{" "}
          <em>Foundation</em> area.
        </li>
        <li>
          When the Stockpile is empty, you can flip and deal the Discard pile
          into a new Stockpile to draw cards again.
        </li>
      </ul>
    </div>
  );
};

export const KlondikeContent = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Play Klondike Solitaire Online</h1>
      <p>
        Klondike is a game involving a deck of cards meant for one player. The
        goal is to create four sequential suit piles from a mix of exposed and
        face-down cards. It is synonymous with the Solitaire game and is often
        called &apos;Patience&apos; in European countries. Klondike is
        frequently mistaken for Canfield, a Casino game version usually referred
        to as Fascination, Demon Patience, or Thirteen.
      </p>
      <p>
        Klondike has two variations that make it different from the Solitaire
        game. These two variations Turn 1 and Turn 3 - where you can limit the
        number of cards to draw at a time. Also, you can limit the number of
        times you can re-use the discarded cards.
      </p>
      <h3>
        <strong>Objective</strong>
      </h3>
      <p>
        To win Klondike, you must build four piles with cards in ascending order
        of the identical suits - Heart (
        <span className="text-red-500">&hearts;️</span>), Spade (&spades;️)️,
        Diamond (<span className="text-red-500">&diams;️</span>), and Club
        (&clubs;️). The ascending order of cards signifies starting with Aces at
        the bottom and Kings on the top.
      </p>
      <p>
        You can only win after you move all the cards to the Foundation area
        from the Tableau area columns, Stockpile, and Discard pile in.&nbsp;
      </p>
      <h3>
        <strong>Game Setup</strong>
      </h3>
      <p>
        The Klondike layout has four areas: Foundation, Tableau, Stockpile, and
        Discard pile. At the start of the game, the cards are placed only in two
        areas: <em>Tableau</em> and <em>Stockpile</em>.
      </p>
      <p>
        At the start of the game, the cards are placed only in two areas:{" "}
        <em>Tableau</em> and <em>Stockpile</em>. With a standard deck of 52
        playing cards, 28 cards are split in 7 columns of the <em>Tableau</em>{" "}
        area, and the remaining 24 cards are used faced-down as a{" "}
        <em>Stockpile</em>.
      </p>
      <h3>
        <strong>Rules</strong>
      </h3>
      <ul className="list-disc">
        <li>
          In the <em>Foundation</em> area, Aces need to be the first card to
          start a suit pile. That means they must be at the bottom of the pile
          to start the ascending order.
        </li>
        <li>
          In the <em>Tableau</em> area, stacks you create must be in descending
          order of alternate black and red colors.
        </li>
      </ul>
      <p>
        <strong>Foundation:</strong>
      </p>
      <ul className="list-disc">
        <li>
          Each pile must have the same suit of cards, with Ace cards at the
          bottom and Kings at the top.
        </li>
        <li>
          You can move a card in one of the piles from three areas: a) Columns
          in the <em>Tableau</em> area, b) a drawn card from the{" "}
          <em>Stockpile</em>, and c) a revealed card from the <em>Discard</em>{" "}
          pile.
        </li>
      </ul>
      <p>
        <strong>Stockpile:</strong>
      </p>
      <p>
        The card you draw from the <em>Stockpile</em> must go in one of the
        columns (<em>Tableau</em>), a suit pile (<em>Foundation</em>), or the{" "}
        <em>Discard</em> pile.
      </p>
      <p>
        Klondike offers two variations to how you can use the <em>Stockpile</em>
        :
      </p>
      <ul className="list-disc">
        <li>
          <strong>Turn 1</strong> - You can draw only <strong>one</strong> card
          at a time and put it into the <em>Discard</em> pile - helpful for
          beginners.
        </li>
        <li>
          <strong>Turn 3</strong> - You can draw <strong>three</strong> cards at
          a time from the <em>Stockpile</em> and use only the topmost card
          facing up(exposed) - suitable for the skilled and those looking for a
          challenge.
        </li>
      </ul>
      <p>
        <strong>Discard pile:</strong>
      </p>
      <p>
        You can only move the card facing up at the top of the <em>Discard</em>{" "}
        pile.
      </p>
      <p>
        When drawing three cards at a time, you can only move the top card
        facing up, and the other two cards stay in the <em>Discard</em> pile.
      </p>
      <p>
        Usually, there is no limit to how often you can deal with the{" "}
        <em>Discard</em> pile in a new <em>Stockpile</em>.
      </p>
      <p>
        You can turn the game challenging if you limit the number of times you
        can flip the <em>Discard</em> pile into a <em>Stockpile</em> to three
        times only.
      </p>
      <p>
        <strong>Tableau:</strong>
      </p>
      <ul className="list-disc">
        <li>
          You can start the game by moving the cards facing up to other columns.
          And when you get Aces facing up, you can move them to the Foundation
          area.
        </li>
        <li>
          The face-down cards reveal when you move the face-up card or the
          entire stack facing up to another column or Foundation area.
        </li>
        <li>
          In a column, you create a stack of cards provided they alternate
          between red and black colors of different suits and are in descending
          order.
        </li>
        <li>
          You can move a stack of cards if they&apos;re in descending order and
          alternative colors to another column. That&apos;s only allowed if the
          destination card is a higher rank than the bottom-most card of the
          stack you want to move. For example, you can move a stack that has 8
          of hearts at the bottom to another column with 9 of clubs.
        </li>
        <li>
          You can use Kings in an empty column to start a new stack of cards in
          the <em>Tableau</em> area.You can move a stack of cards with King at
          the bottom to an empty column area.&nbsp;
        </li>
      </ul>
    </div>
  );
};

export const FreecellContent = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Play FreeCell Online</h1>
      <p>
        FreeCell is a unique and challenging variation of the Solitaire game. It
        gained popularity as video game software on Windows 95 and has been one
        of the most played games since. In a FreeCell game, all the cards face
        up and are always visible to the player.
      </p>
      <p>
        The game requires you to move all cards into four (4) separate piles,
        one of each suit in a sequential order. You get four open cells to stash
        four cards while shuffling around the rest.
      </p>
      <p>
        Nearly all FreeCell games are easy to win. A popular variation of
        FreeCell is Baker&apos;s Game, which has the same goal and is relatively
        difficult to beat. However, the gameplay requires you to create stacks
        of cards of the same suit in the Tableau area.&nbsp;
      </p>
      <h3>
        <strong>Objective</strong>
      </h3>
      <p>
        To win a game of FreeCell, you need to create four separate piles, each
        for a suit - Hearts (<span className="text-red-500">&hearts;️</span>),
        Clubs (&clubs;️), Diamonds (
        <span className="text-red-500">&diams;️</span>), and Spades (&spades;️).
        In the Foundation area, each pile must have cards of the same suit in
        ascending order - Aces at the bottom and Kings at the top.
      </p>
      <h3>
        <strong>Game Setup</strong>
      </h3>
      <p>
        FreeCell&apos;s layout has three areas - Foundation, Tableau, and Free
        cells.
      </p>
      <p>
        At the start of the game, a standard deck of 52 playing cards appears
        face-up in the Tableau area. Above it are the four empty cells and four
        slots for the suit-wise piles in the Foundation area.
      </p>
      <p>
        The Tableau area has eight (8) columns with cards facing up. The first
        four (4) columns from the left have seven cards in each column, and the
        remaining four (4) columns have six cards.
      </p>
      <p>
        Foundation and FreeCell areas remain empty at the start of the game.
      </p>
      <p>Baker&apos;s game has the same layout of cards.</p>
      <h3>
        <strong>Rules</strong>
      </h3>
      <ul className="list-disc">
        <li>
          In FreeCell, the stacks you create in the columns of the{" "}
          <em>Tableau</em> area must be in alternating colors (black and red)
          and descending order.
        </li>
        <li>
          For the Baker&apos;s Game variant, you must create stacks with cards
          of the same suit in descending order inside the columns of the{" "}
          <em>Tableau</em> area.
        </li>
      </ul>
      <h4>
        <strong>FreeCell</strong>
      </h4>
      <p>
        - At the start of the game, you get four free cells. You can move a
        single card into any of those free cells.
      </p>
      <p>
        - You can only put one card in an empty cell, so each of the four cells
        can hold up to four cards.
      </p>
      <p>
        - You can move the card from one of the cells to a column in the{" "}
        <em>Tableau</em> area or a pile in the <em>Foundation</em> area.
      </p>
      <p>
        - You can move the top card from a pile in the <em>Foundation</em> area
        to a free cell. Tip: Avoid moving Kings to the free cells to improve
        your chances of winning.
      </p>
      <h4>
        <strong>Foundation</strong>
      </h4>
      <p>
        You need to create four separate piles, each for one suit. The cards in
        each suit pile must be in ascending order, starting with Ace at the
        bottom and ending with King at the top.
      </p>
      <p>
        You can directly move a card from a free cell to the <em>Foundation</em>{" "}
        area.
      </p>
      <h4>
        <strong>Tableau</strong>
      </h4>
      <p>
        - You start the game by moving the cards between one of the three areas:
        columns in the <em>Tableau</em>, a free cell, or the piles in the{" "}
        <em>Foundation</em> area.
      </p>
      <p>
        - You can move a stack of cards with alternating colors and descending
        between columns. That is only allowed if the top card facing up in the
        destination column is of a higher rank (number) than the bottom-most
        card in the stack you want to move. For example, you can move a stack
        that has 7 of Spades at the bottom to a column with either 8 of Hearts
        or Diamonds as the top card.
      </p>
      <p>
        - You must create stacks that alternate between black and red colors of
        separate suites in descending order. For example, your stack can start
        with 10 of Clubs at the bottom, followed by 9 of Diamonds on top of it.
        You can move it to a column with Jack of Hearts or Diamonds facing it.
      </p>
      <p>
        - An empty column is more valuable than a free cell because you can move
        or start a stack of cards with one of the Kings.
      </p>
      <p>
        - You can move any card in an empty column in the <em>Tableau</em> area
        to start a stack.
      </p>
      <p>
        - When necessary, you can move a card from a pile in the{" "}
        <em>Foundation</em> area to a column in the <em>Tableau</em>.
      </p>
    </div>
  );
};

export const SpiderContent = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Play Spider Solitaire Online</h1>
      <p>
        Spider is part of the Solitaire family and is ideal for solo players.
        However, this version is challenging because Spider involves 104 playing
        cards and an elaborate layout. The goal is to move all the cards
        sequentially; each suit gets a separate pile in the Foundation area.
      </p>
      <p>
        You can choose to play Spider Solitaire in three options -{" "}
        <strong>
          <a href="https://ilovesolitaire.com/spider/">1 suit</a>
        </strong>
        ,{" "}
        <strong>
          <a href="https://ilovesolitaire.com/spider/2-suits/">2 suit</a>
        </strong>
        , and{" "}
        <strong>
          <a href="https://ilovesolitaire.com/spider/4-suits/">4 suit</a>
        </strong>
        . Beginners can choose the 1 suit option since it&apos;s easiest to win
        and suitable for those who&apos;ve never played the game. Those with
        Intermediate players can choose the 2 suits option for medium
        difficulty. Meanwhile, Advanced players can select the 4 suits option
        for the most challenging game.
      </p>
      <h3>
        <strong>Objective</strong>
      </h3>
      <p>
        Depending on the Spider game option you choose, you get to use one, two,
        or all four suits - Hearts (
        <span className="text-red-500">&hearts;️</span>), Clubs (&clubs;️),
        Diamonds (<span className="text-red-500">&diams;️</span>), and Spades
        (&spades;️).
      </p>
      <p>
        You must transfer all cards to build 8 separate piles, each of one suit,
        containing cards sequentially. You need to build the suit piles in the
        Tableau area. Only when you have a full suit of 13 cards, can you
        transfer it to the Foundation area.
      </p>
      <h3>
        <strong>Game Setup</strong>
      </h3>
      <p>
        Spider Solitaire has a broad layout consisting of Tableau, Foundation,
        and Stockpile.
      </p>
      <p>
        At the start, the Foundation area has 8 empty slots where you can place
        8 different suits carrying 13 cards in the same sequence - Kings at the
        bottom and Aces at the top.
      </p>
      <p>
        In the <strong>Tableau</strong> area, you get ten (10) columns. From the
        left, the first four (4) columns have six (6) cards&mdash;five (5) face
        down and one (1) face up.
      </p>
      <p>
        The following (six) 6 columns have five (5) cards&mdash;four (4) face
        down and one (1) face up.
      </p>
      <p>
        The Tableau area for these ten (10) columns must contain 54 cards. You
        need to use the remaining 50 cards as a Stockpile.
      </p>
      <p>
        In the Spider{" "}
        <strong>
          <a href="https://ilovesolitaire.com/spider/">1 suit</a>
        </strong>{" "}
        option, you can play with 104 cards from any of the four suits - Hearts,
        Clubs, Diamonds, and Spades.
      </p>
      <p>
        The Spider{" "}
        <strong>
          <a href="https://ilovesolitaire.com/spider/2-suits/">2 suit</a>
        </strong>{" "}
        option requires playing with 104 cards from any two of the four suits.
      </p>
      <p>
        Finally, the Spider{" "}
        <strong>
          <a href="https://ilovesolitaire.com/spider/4-suits/">2 suit</a>
        </strong>{" "}
        option entails playing 104 cards of all four suits.
      </p>
      <p>
        In all three Spider options, the Stockpile consists of the remaining 50
        cards.&nbsp;
      </p>
      <h3>
        <strong>Rules</strong>
      </h3>
      <h4>
        <strong>Foundation</strong>
      </h4>
      <p>
        You can move a pile of the same suit after you build it in descending
        order - Kings at the bottom and Aces at the top.
      </p>
      <h4>
        <strong>Stockpile</strong>
      </h4>
      <p>
        When you can&apos;t move cards in the <em>Tableau</em>, use the
        Stockpile to draw 10 cards and place one facing upwards on each column.
        Since the Stockpile consists of 50 cards, you can only use it 5 times to
        replenish the cards in the <em>Tableau</em>.
      </p>
      <h4>
        <strong>Tableau</strong>
      </h4>
      <p>
        - You start by moving around the 10 cards facing up in the columns to
        create stacks in descending order and gradually reveal the face-down
        cards.
      </p>
      <p>
        - You get to reveal a face-down card only after you move a face-up card
        or a stack of cards in descending order to another column.
      </p>
      <p>
        - You can move any card or stack in descending order to an empty column.
        However, moving Kings to create a stack is a good idea.
      </p>
      <p>
        - Spider{" "}
        <strong>
          <a href="https://ilovesolitaire.com/spider/">1 suit</a>
        </strong>
        : you can move your card(s) between columns only if they form a
        descending order. For example, you can place 8 of Hearts on top of 9 of
        Hearts while playing with the Hearts suit.
      </p>
      <p>
        - Spider{" "}
        <strong>
          <a href="https://ilovesolitaire.com/spider/2-suits/">2 suit</a>
        </strong>{" "}
        and{" "}
        <strong>
          <a href="https://ilovesolitaire.com/spider/4-suits/">4 suit:</a>
        </strong>{" "}
        the stack of cards you want to move must be of the same suit in
        descending order. Also, you can move the stack of same-suit cards to
        another column with any suit but to a higher or greater card. For
        example, you can place a Hearts stack with 2 and Ace of Hearts on top of
        3 of Clubs.
      </p>
      <p>
        However, moving cards of the same suit to a different suit has a
        disadvantage. It will block the top card of the destination column until
        you move the card above it. So your 3 of Clubs is blocked and you can
        move it only after you move the 2 of Hearts from its top. So, only move
        a stack of the same suit cards to a different suit if you&apos;ve run
        out of moves in the Tableau.
      </p>
      <p>
        - The game ends when you run out of moves in the Tableau and out of
        cards from the Stockpile.
      </p>
    </div>
  );
};

export const ContentLoader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full flex justify-center items-center my-6 bg-[#f7f8f9]">
      <div className="bg-white p-4 px-8 md:w-4/5 rounded-2xl">{children}</div>
    </div>
  );
};
