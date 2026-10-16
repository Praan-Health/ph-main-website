import { defineConfig } from 'vitest/config'

// Unit tests for pure logic only (no DOM); the forms service has its own node:test suite.
export default defineConfig({ test: { include: ['src/**/*.test.ts'], environment: 'node' } })
