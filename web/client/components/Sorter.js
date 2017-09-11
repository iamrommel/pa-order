import React from 'react'
import { Sorter as DefaultSorter, withMongoSort } from 'pcmli.umbrella.core'

export const Sorter = withMongoSort()(DefaultSorter)