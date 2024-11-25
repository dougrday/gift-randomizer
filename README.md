# Instructions

Run `node randomize.mjs [group]` to generate a random list of names.

This uses the `names-[group].txt` and `history-[group].txt` files to generate the list, while ensuring no previous matches in `history-[group].txt` are repeated.

`names-[group].txt` is a list of names to be matched, with each name separated by a newline. Each name includes the name and family identifier, separated by a comma. Families are guaranteed to gift across family boundaries.
`history-[group].txt` is a comma-separated list of names that have already been matched, with each match pair separated by a newline.
