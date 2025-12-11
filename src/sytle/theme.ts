import { definePreset } from '@primeuix/themes'
import aura from '@primeuix/themes/aura'

export const theme = definePreset(aura, {
    semantic: {
        primary: {
            50: '{pink.50}',
            100: '{pink.100}',
            200: '{pink.200}',
            300: '{pink.300}',
            400: '{pink.400}',
            500: '{pink.500}',
            600: '{pink.600}',
            700: '{pink.700}',
            800: '{pink.800}',
            900: '{pink.900}',
            950: '{pink.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{primary.400}',
                    hoverColor: '{primary.500}',
                    activeColor: '{primary.600}',
                    contrastColor: '{surface.50}'
                }
            }
        }
    }
})
