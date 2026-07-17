import React from 'react'
import { Image, ScrollView, View } from '@tarojs/components'
import styles from './index.module.scss'

interface PsdPageProps {
  src: string
  width: number
  height: number
}

const PsdPage: React.FC<PsdPageProps> = ({ src, width, height }) => {
  const pageHeight = `${(height / width) * 750}rpx`

  return (
    <ScrollView className={styles.page} scrollY enhanced showScrollbar={false}>
      <View className={styles.canvas} style={{ height: pageHeight }}>
        <Image className={styles.image} src={src} mode='widthFix' showMenuByLongpress={false} />
      </View>
    </ScrollView>
  )
}

export default PsdPage
