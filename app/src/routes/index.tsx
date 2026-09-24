import { createFileRoute } from "@tanstack/react-router";
import { type CSSProperties, type FormEvent, useState } from "react";

import { submitOrder } from "@/lib/order.functions";

export const Route = createFileRoute("/")({ component: Index });

const notes = [
  "Табак",
  "Горький шоколад",
  "Темный ром",
  "Масло мадагаскарского чёрного перца",
  "Лабданум",
  "Масло китайского кедра",
  "Бобы тонка",
];

function Index() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    try {
      await submitOrder({
        data: {
          name: String(form.get("name") ?? ""),
          contact: String(form.get("contact") ?? ""),
          city: String(form.get("city") ?? ""),
          note: String(form.get("note") ?? ""),
        },
      });
      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="site-shell">
      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="ENTRE NOUS, начало страницы">ENTRE NOUS</a>
        <nav aria-label="Главная навигация">
          <a href="#letter">Письмо</a>
          <a href="#philosophy">Между нами</a>
          <a href="#fragrance">SLOW BURN</a>
        </nav>
        <a className="nav-order" href="#order">Выбрать</a>
      </header>

      <section id="top" className="static-hero" aria-labelledby="hero-title">
        <img src="/assets/images/elevator-kiss-hero.webp" alt="Поцелуй за почти закрывшимися дверями лифта" />
        <div className="static-hero-shade" aria-hidden="true" />
        <div className="static-hero-copy">
          <p className="hero-brand">ENTRE NOUS</p>
          <h1 id="hero-title">SLOW BURN</h1>
          <p className="hero-line">Не рассказывай. Пусть спрашивают.</p>
          <div className="hero-meta"><span>Eau de parfum</span><span>30 мл</span></div>
          <a className="hero-open" href="#fragrance">Открыть SLOW BURN</a>
        </div>
      </section>

      <section id="letter" className="letter-section content-section">
        <div className="portrait-frame">
          <img src="/assets/images/demid.jpg" alt="Демид, создатель ENTRE NOUS" />
        </div>
        <article className="letter-copy">
          <p className="section-kicker">Здравствуй</p>
          <h2>Я создаю ароматы ENTRE NOUS сам.</h2>
          <p>Меня зовут Демид.</p>
          <p>Я пришёл в парфюмерию из привычки замечать.</p>
          <p>Я замечаю свет в окне, который не гаснет после полуночи. Пуговицу, застёгнутую не в ту петлю. Когда человек уже попрощался, но всё ещё не отпускает дверную ручку. Тишину в такси, которую больше не надо заполнять разговором. Когда перед возвращением в комнату твой воротник поправляешь не ты, а она.</p>
          <p>Такие детали ничего не доказывают. Именно поэтому они говорят правду.</p>
          <p>Я создаю ароматы таких моментов.</p>
          <p>Я создаю ароматы для таких моментов.</p>
          <div className="signature" aria-label="Подпись Демид А.">Демид А.</div>
        </article>
      </section>

      <section id="philosophy" className="philosophy-section content-section">
        <div className="philosophy-image">
          <img src="/assets/images/macro-cap.png" alt="Макро рифлёной золотой крышки и матового чёрного стекла SLOW BURN" />
        </div>
        <article className="philosophy-copy">
          <h2>Между нами</h2>
          <p><span lang="fr">Entre nous</span> по-французски означает «между нами».</p>
          <p>Это формула доверенной тайны: когда говорят «entre nous...», дальше следует то, что не предназначено для чужих ушей. Имя бренда приглашает в разговор, который ведут вполголоса.</p>
          <p>Сила не нуждается в громких словах. Я создаю плотные, томные композиции с мощным звучанием. Они входят в комнату вместе с тобой, остаются в ней после тебя и при этом не объясняют ничего.</p>
          <p>Однотонное стекло, металл, ни одной лишней детали. Флакон почти немой, потому что говорить должен аромат.</p>
          <blockquote>Не рассказывай о нём.<br />Пусть спрашивают.</blockquote>
        </article>
      </section>

      <section id="fragrance" className="fragrance-section content-section">
        <div className="fragrance-copy">
          <p className="section-kicker">Первый аромат ENTRE NOUS</p>
          <h2>SLOW BURN</h2>
          <div className="fragrance-meta">
            <span>Eau de parfum</span><span>30 мл</span><span>Плотный, тёплый, смолистый</span>
          </div>
          <p>Масло мадагаскарского чёрного перца даёт сухую искру. За ней поднимаются табак, темный ром и горький шоколад. Не сладкий десертный аккорд, а тёмная горечь какао.</p>
          <p>Лабданум даёт смолистый жар, масло китайского кедра собирает его в сухую древесную линию, а бобы тонка добавляют телесное тепло.</p>
          <p>Это горение без открытого пламени. Огонь уже скрыт внутри материала, поэтому кажется спокойным. Но стоит приблизиться, и становится понятно, сколько жара он удерживает.</p>
        </div>
        <figure className="bottle-stage">
          <img src="/assets/images/studio-bottle.png" alt="Флакон ENTRE NOUS SLOW BURN в тёмной студийной постановке" />
        </figure>
      </section>

      <section className="story-section content-section">
        <img src="/assets/images/campaign-elevator.png" alt="Флакон SLOW BURN в просвете бронзовых дверей лифта" />
        <div className="story-copy">
          <p>Личное не всегда происходит наедине. Иногда вокруг звучат голоса, открываются двери, меняется свет, кто-то проходит совсем рядом. Но внутри общего пространства возникает другое расстояние, измеряемое уже не шагами.</p>
          <p>Двое могут стоять по разные стороны комнаты и быть ближе, чем люди, которые касаются друг друга. Могут поддерживать общий разговор. А могут не произнести вообще ничего, потому что всё уже было сказано взглядом.</p>
          <strong>Его присутствие чувствуют все, но лишь один человек знает, почему сегодня ты выбрал именно его.</strong>
        </div>
      </section>

      <section className="notes-section content-section" aria-labelledby="notes-title">
        <h2 id="notes-title">Ноты</h2>
        <figure className="notes-visual">
          <img src="/assets/images/notes-still-life.png" alt="SLOW BURN среди табака, какао, тёмного рома, перца, лабданума, кедра и бобов тонка" />
        </figure>
        <div className="notes-score">
          {notes.map((note, index) => <span key={note} style={{ "--note-index": index } as CSSProperties}>{note}</span>)}
        </div>
      </section>

      <section id="order" className="order-section content-section">
        <div className="box-stage">
          <img src="/assets/images/packaging.png" alt="Флакон и чёрная коробка ENTRE NOUS SLOW BURN с тиснением" />
          <p>К каждому флакону прилагается личное письмо.</p>
        </div>
        <div className="order-panel">
          <p className="section-kicker">SLOW BURN, 30 мл</p>
          <h2>Выбрать аромат</h2>
          <p>Оставь контакты. Я лично подтвержу наличие, стоимость и доставку.</p>
          <form onSubmit={handleOrder}>
            <label>Имя<input name="name" autoComplete="name" required minLength={2} /></label>
            <label>Телефон или почта<input name="contact" autoComplete="email" required minLength={5} /></label>
            <label>Город<input name="city" autoComplete="address-level2" required minLength={2} /></label>
            <label>Комментарий<textarea name="note" rows={3} /></label>
            <button className="submit-order" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Отправляю..." : "Отправить запрос"}
            </button>
            <div className="form-status" aria-live="polite">
              {status === "success" && "Запрос получен. Я свяжусь с тобой лично."}
              {status === "error" && "Не удалось отправить запрос. Попробуй ещё раз."}
            </div>
          </form>
        </div>
      </section>

      <footer>
        <p>ENTRE NOUS</p>
        <p>Не рассказывай. Пусть спрашивают.</p>
        <a href="#top">Наверх</a>
      </footer>
    </main>
  );
}
