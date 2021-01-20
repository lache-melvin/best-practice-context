# The time I played with the React Context API: a story.

For context (hah), we have been planning updates to our curriculum at [EDA](https://devacademy.co.nz/), and as part of that we considered moving from managing client side global state with Redux to with the React Context API. I took it upon myself to try it out in [best-practice](https://github.com/enspiral-dev-academy/best-practice), which is an app that will eventually serve as a standard for naming, structure and application shape for the EDA curriculum - and it's also a great playground ;).

It was quickly apparently that between a provider and a hook, an easy implementation of Context wouldn't be hard at all (though we've chosen to keep Redux for a number of reasons)... but this simply wasn't enough for me, and thus this fork was born.

I wanted to find a clean and scalable pattern to work with Context. Initially the intention was that we could use this pattern in the curriculum, though it quickly got a little out of hand given the size of the apps we build (and the fact that it's for _curriculum_, not production)...

I had been recently introduced to the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), and as any good junior developer does, I took this on as gospel and applied it everywhere with little questioning. Having never worked on a bigger codebase before though, it was a really fun exploration in wrapping external dependencies, and then injecting dependencies at every layer with factory functions.

I knew I wanted the components themselves to only receive data from props, so while there was a brief iteration with custom hooks, I ended up using higher order components. This made testing the components an significantly more pleasant experience, but the higher order components... less so. (I'm actually curious to try this again at some point, I think my understanding of testing philosophy in particular has developed a lot since then.)

And then came along my excitement about recursion. I ended up writing some helper functions; [wrappedWith](https://github.com/lache-melvin/whats-the-context/blob/main/client/wrappers/index.js) (makes wrapping a component in multiple higher order components a slightly more readable experience) and [createCombinedProvider](https://github.com/lache-melvin/whats-the-context/blob/main/client/context-utils.js) (creates one context provider to wrap the app in, regardless of the number of contexts you have, and reduces the noise in the React dev tools component tree to only one layer per context - I was quite pleased with this one!)

The main bugbear with Context is that when you consume a particular context, your component is going to re-render on every change to that context, whether your component actually cares about that change or not. In a lot of cases, you can diminish this problem by separating out your contexts (i.e. not having one huge object), but the following scenario does regularly occur:

Say my PendingContext uses state, so has a value of `[pending, setPending]`. From one component, I want to _set_ the pending state, but the state itself is only needed elsewhere.

I have to consume the PendingContext, e.g. `const [, setPending] = useContext(PendingContext)` - even though I have only destructured the `setPending` function, my component rerenders on every change to `pending`. There is no way to decouple the context, to only watch for changes in parts (or none) of it.

I saw a few attempts at solving this problem floating around online, using memoisation (though this is only intended to be used for performance, not preventing renders) or with some kind of Proxy, but nothing seemed like a great solution, and there definitely wasn't a widely used pattern that I could find... so naturally I thought I'd try my hand at creating one.

Essentially, I ended up with a deep appreciation for Redux :)

I found one solution by using some extra abstraction, but I couldn't understand why it worked one way and not another, and didn't want to use the code until I understood it. I have another idea that I've yet to try, but the plotting continues!

## Setup

To get this repo working on your computer, you'll need `node` installed. After cloning this repo:

```sh
cd whats-the-context
cp server/.env.example server/.env
npm install
npm run db:migrate
npm run db:seed
npm test
npm run dev
```

The server should be listening at [http://localhost:3000](http://localhost:3000). As you'll be able to tell, I have a real passion for design and CSS ;)
