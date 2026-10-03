const messages = [
  {
    id: 1,
    full: `anyway i appreciate u if u somehow actually took the time to read all that penting gapenting di sebelah 😹

itu juga bukan sebenernya hal yg paling pengen gue lurusin antara kita. more like a bridge into whatever our next talk is, biar at least u ngerti how i saw things and where my head was coming from waktu itu.

i dont expect it to solve anything. i just want u to understand me a little better before we try to understand us.`
  },
  {
    id: 2,
    full: `gue rasa sekarang gue mulai ngerti kenapa banyak hal yg gue lakuin mungkin terasa overwhelming buat lo.

waktu itu gue ngeliat semuanya dari cara gue sendiri. buat gue kalau gue care sama seseorang, gue naturally pengen spend time sama dia, tau kabarnya, dilibatin dikit di hidupnya, dan ya ada some sense of consistency... ya karena gue jg trauma pas awal tahun u said i was being inconsistent 😹

jadi pas gue gak dapet itu dari lo, i translate it into lo gak terlalu peduli, gue gak penting, atau lo simply gak invested sama gue apalagi ur ass is a dry texter makes it way harder to distinct

and maybe that was an unfair thinking from me.

maybe to care about someone never meant giving them constant access to your time, attention, or daily life. lo bisa genuinely care and still need distance. lo bisa suka presence seseorang tanpa selalu pengen interaction. lo bisa interested in someone without automatically wanting all the expectations that come with it.

dan kayaknya gue baru bener2 belajar itu skrg, after 3 years since we first met.

kemarin gue juga kepikiran gini, i still felt like i had a looong way to go into knowing you, sementara somehow gue ngerasa u already knew me enough. or at least enough to know how much of me u wanted in your life.

padahal dari sisi gue masih banyak bgt. i still had so much to show u, so much to tell u, so many things i wanted to do with u. not even in some grand gestures, gue cuma masih ngerasa kayak... damn we havent even scratched the surface yet.

maybe thats why gue kept trying to create more time with u too. because in my head, we weren't at the end of figuring each other out. i felt like we barely even got the chance to properly start.

dan mungkin disitu juga kita udah ngeliat hubungan ini dari tempat yg beda. i was still thinking about everything we hadn't gotten to know about each other yet, while maybe u already felt like what u knew was enough.

setiap gue ngerasa ada distance, instinct gue malah mendekat. gue nanya lebih banyak, pengen reassurance, pengen ketemu, pengen ngerti posisi gue di hidup lo. buat gue itu trying to build closeness, tapi mungkin buat lo malah terasa kayak gue terus asking for more access than what you were comfortable giving.

the more distance i felt, the more i tried to get closer. and maybe the more i tried to get closer, the more distance you needed.

maybe it wasn't really a communication problem. maybe it was compatibility. maybe we just don't speak the same language when it comes to closeness, space, affection, and what caring about someone even looks like.

cuma disitu gue masih agak bingung sih. karena gue percaya compatibility juga gak selalu magically ada dari awal. some of it is built from loving someone. u belajar orangnya, adjust, ketemu ditengah, terus lama2 bikin cara sendiri buat exist together.

but then comes paradox yg ky how do you even build that if there isn't enough compatibility to begin with?

well i do aware compatibility is a byproduct of loving... arguably but some might agree, but there still has to be enough compatibility for that love to have somewhere to exist. dan gue gatau batasnya dimana atleast with u, u kinda different duh. mana perbedaan yg sebenernya bisa dipelajarin bareng, mana yg emang terlalu fundamental buat dipaksa.

mungkin itu juga yg susah gue terima. maybe you already understood my intention. lo mungkin udah tau gue care, gue pengen lebih dekat, dan gue serius.

maybe you just didn't want closeness in the same form that i did.

dan kalau iya, mungkin emang gak ada wording yg bisa magically fix that.

gue juga gak mau sekarang ujung2nya nganggep semua kebutuhan gue salah dan invalid. gue tetep pengen relationship dimana gue gak harus constantly wonder apakah orang itu sebenernya mau gue ada di hidupnya. gue pengen someone who naturally makes room for me and makes me feel wanted without me having to keep asking.

but wanting that doesn't mean i'm entitled to get it from you.

maybe neither of us needed to become more like the other. mungkin kita cuma telat ngerti kalau sesuatu yg terasa kayak care and effort buat satu orang, bisa terasa kayak pressure buat yg lain.

and idk, maybe understanding that doesnt fix anything. tapi setidaknya sekarang gue agak lebih ngerti kita kenapa bisa jadi begini.
`
  }
];

const archive = document.getElementById('archive');
const messageView = document.getElementById('message-view');
const readCounter = document.getElementById('read-counter');
const readBody = document.getElementById('read-body');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');
const backButton = document.querySelector('.back-button');
const cards = document.querySelectorAll('.message-card');

let activeMessageId = null;

function setReadNav(id) {
  if (id === 1) {
    nextButton.classList.remove('hidden');
    prevButton.classList.add('hidden');
  } else if (id === 2) {
    nextButton.classList.add('hidden');
    prevButton.classList.remove('hidden');
  }
}

function openMessage(id) {
  const message = messages.find((entry) => entry.id === id);

  if (!message) {
    return;
  }

  activeMessageId = id;
  readCounter.textContent = `${String(id).padStart(2, '0')} / 02`;
  readBody.textContent = message.full;
  setReadNav(id);

  archive.classList.add('hidden');
  messageView.classList.remove('hidden');
  messageView.setAttribute('aria-hidden', 'false');
}

function closeMessage() {
  archive.classList.remove('hidden');
  messageView.classList.add('hidden');
  messageView.setAttribute('aria-hidden', 'true');
  activeMessageId = null;
}

function goToMessage(offset) {
  if (activeMessageId === null) {
    return;
  }

  const nextId = activeMessageId + offset;

  if (nextId >= 1 && nextId <= messages.length) {
    openMessage(nextId);
  }
}

cards.forEach((card) => {
  card.addEventListener('click', () => {
    openMessage(Number(card.dataset.message));
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openMessage(Number(card.dataset.message));
    }
  });

  card.querySelector('.read-button').addEventListener('click', (event) => {
    event.stopPropagation();
    openMessage(Number(card.dataset.message));
  });
});

backButton.addEventListener('click', closeMessage);
nextButton.addEventListener('click', () => goToMessage(1));
prevButton.addEventListener('click', () => goToMessage(-1));

document.addEventListener('keydown', (event) => {
  if (messageView.classList.contains('hidden')) {
    return;
  }

  if (event.key === 'Escape') {
    closeMessage();
  }

  if (event.key === 'ArrowRight' && activeMessageId === 1) {
    openMessage(2);
  }

  if (event.key === 'ArrowLeft' && activeMessageId === 2) {
    openMessage(1);
  }
});