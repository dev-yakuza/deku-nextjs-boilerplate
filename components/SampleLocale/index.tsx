import { useTranslation } from 'next-i18next'

export const SampleLocale = () => {
  const { t } = useTranslation('common')

  return (
    <p>
      {t('English')} | {t('Korean')} | {t('Japanese')}
    </p>
  )
}
