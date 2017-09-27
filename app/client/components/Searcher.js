import React from 'react'
import { Searcher as DefaultSearcher, withMongoSearch } from 'pcmli.umbrella.core'

export const Searcher = withMongoSearch()(DefaultSearcher)



