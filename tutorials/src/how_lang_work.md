# How do languages work?

When coding in fck, you have a default language specified in your `.fck` config file. This means you don't need to specify what language you're writing in when you start a new project. But what if you want to change language? to change language, you use syntax borrowed from the shebang, `#!` followed by a language code.

## What's a language code?

A language code is a unique identifier that specified a specific language. For example, `en` is English and `kr` is Korean. There are taken from ISO 639-1 if you're interested.

You can (of course) abuse the gaps in the standard to add in your own language files. In total, only 183 of the possible 676 language codes have been used, leaving just under 500 for you to pick from to make your own language files.

## Switching between languages

As previously mentioned, you can use the `#!` syntax to switch between different languages. You can use this wherever you want, so long as it's on its own line. 

## Adding your own language files

fck will come bundled with a few built-in language files. However, it'd be pretty short signed of us to design it so that was all you had. fck can read `.fckl` files (fck language files) which are stored locally. Where it's stored depends on your operating system. You can have as many of these as you want, but only files with two character names will be used (something like `abc.fckl` will be ignored) since the language file name is what's used for the language code.

To get started making your own language file, we recommend downloading the language file for a language you know from [GitHub](https://github.com/fck-language/fck/tree/main/lang/fckl%20equivelents) and editing that. The files all have to have a specific format, so making one from scratch could get quite annoying.

## Adding your language to fck

If you speak a language that isn't available as bundled with fck, you're more than welcome to add it in. to do that, simply make an fck language file and then submit a pull request on GitHub. If this is accepted, then the language will be added as an optionally bundled language with any fck build.
