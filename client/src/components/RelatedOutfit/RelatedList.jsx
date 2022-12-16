import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import RelatedCard from './RelatedCard.jsx';
import { buildHandleEnterKeyPress } from '../../util';

const RelatedList = ({
  current, CurMeta, setCurrent, setCurStars, calculateAverageStars,
  setMetadata, darkMode, setCurrentStyles, relateArr,
}) => {
  const [viewStart, setViewStart] = useState(0);
  const [viewEnd, setViewEnd] = useState(0);
  const [cards, setCards] = useState({
    0: null, 1: null, 2: null, 3: null, 4: null,
  });

  // useEffect(() => {
<<<<<<< HEAD
  //   console.log('newCards: ', cards);
  // }, [cards]);
=======
  //   const newCards = {
  //     0: cards[0], 1: cards[1], 2: cards[2], 3: cards[3], 4: cards[4],
  //   };
  //   const tempCard1 = document.getElementsByClassName(local.relatedCard);
  //   const tempCard2 = document.getElementsByClassName(local.hoverMe);
  //   // const tempCard3 = document.getElementsByClassName(local.relatedCardDark);
  //   // const tempCard4 = document.getElementsByClassName(local.hoverMeDark);
  //   console.log('temp array', tempCard1)
  //   for (let i = 0; i < tempCard1.length; i++) {
  //     console.log('tempcard1', tempCard1[i]);
  //     if (darkMode) {
  //       tempCard1[i]?.classList?.replace(local.relatedCard, local.relatedCardDark);
  //       tempCard2[i]?.classList?.replace(local.hoverMe, local.hoverMeDark);
  //     } else if (!darkMode) {
  //       // tempCard3[i]?.classList?.replace(local.relatedCardDark, local.relatedCard);
  //       // tempCard4[i]?.classList?.replace(local.hoverMeDark, local.hoverMe);
  //     }
  //   }
  //   //newCards[0]?.props.darkMode
  //   //console.log('class name get elements', document.getElementsByClassName(local.relatedCard));
  //   // setCards(newCards);
  // }, [darkMode]);
>>>>>>> 290f265b012b6a57ea3f816dcd26f34a3487ed77

  const build = (relateOneId, index) => {
    const temp = cards;
    temp[index] = (
      (
        <RelatedCard
          key={`${index + current.id}`}
          relateOneId={relateOneId}
          current={current}
          CurMeta={CurMeta}
          setCurrent={setCurrent}
          setCurStars={setCurStars}
          calculateAverageStars={calculateAverageStars}
          setMetadata={setMetadata}
          darkMode={darkMode}
          setCurrentStyles={setCurrentStyles}
          setCards={setCards}
        />
      )
    );
    // console.log('built: ', temp);
    setCards(temp);
  };

  const buildOne = (relatedOne) => (
    (
      <RelatedCard
        key={`${current.id + relatedOne}`}
        relateOneId={relatedOne}
        current={current}
        CurMeta={CurMeta}
        setCurrent={setCurrent}
        setCurStars={setCurStars}
        calculateAverageStars={calculateAverageStars}
        setMetadata={setMetadata}
        darkMode={darkMode}
        setCurrentStyles={setCurrentStyles}
        setCards={setCards}
      />
    )
  );

  useEffect(() => {
    if (relateArr.length > 5) {
      const overflow = relateArr.length - 5;
      const calcStart = Math.floor(overflow / 2);
      setViewStart(calcStart);
      setViewEnd(calcStart + 5);
      const copy = relateArr.slice(calcStart, calcStart + 5);
      copy.map((id, index) => build(id, index));
    } else {
      setViewStart(0);
      setViewEnd(relateArr.length);
      relateArr.map((id, index) => build(id, index));
    }
  }, [relateArr]);

  const preClick = (event) => {
    event.preventDefault();
    const newCards = {
      0: null, 1: cards[0], 2: cards[1], 3: cards[2], 4: cards[3],
    };
    newCards[0] = buildOne(relateArr[viewStart - 1]);
    setViewStart(viewStart - 1);
    setViewEnd(viewEnd - 1);
    setCards(newCards);
  };

  const nextClick = (event) => {
    event.preventDefault();
    const newCards = {
      0: cards[1], 1: cards[2], 2: cards[3], 3: cards[4], 4: null,
    };
    newCards[4] = buildOne(relateArr[viewEnd]);
    setViewStart(viewStart + 1);
    setViewEnd(viewEnd + 1);
    setCards(newCards);
  };

  return (
    <div className={local.carousel}>
      <div className={local.related}>
        <div
          role="button"
          tabIndex={0}
          className={local.prevRel}
          onClick={(e) => preClick(e)}
          onKeyPress={buildHandleEnterKeyPress((e) => preClick(e))}
        >
          {viewStart === 0 ? null : <div>&lt;</div>}
        </div>

        <div
          role="button"
          tabIndex={0}
          className={local.nextRel}
          onClick={(e) => nextClick(e)}
          onKeyPress={buildHandleEnterKeyPress((e) => preClick(e))}
        >
          {viewEnd < relateArr.length && relateArr.length > 5 ? <div>&gt;</div> : null}
        </div>
        {cards[0]}
        {cards[1]}
        {cards[2]}
        {cards[3]}
        {cards[4]}
      </div>
    </div>
  );
};

export default RelatedList;
