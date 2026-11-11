export class PlayerHealth {
  constructor(maxHealth = 100) {
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.isAlive = true;
    this.regenTimer = 0;
    this.shield = 0;
    this.shieldTimer = 0;
    this.damageTaken = 0;
    this.lastDamageTime = 0;
  }

  reset(health = this.maxHealth) {
    this.currentHealth = Math.min(health, this.maxHealth);
    this.isAlive = true;
    this.shield = 0;
    this.shieldTimer = 0;
    this.regenTimer = 0;
    this.damageTaken = 0;
    this.lastDamageTime = 0;
  }

  takeDamage(amount, source) {
    if (!this.isAlive) return 0;
    const applied = Math.max(1, Math.round(amount));
    const shieldDamage = Math.min(this.shield, applied);
    this.shield -= shieldDamage;
    const healthDamage = applied - shieldDamage;
    this.currentHealth = Math.max(0, this.currentHealth - healthDamage);
    this.damageTaken += applied;
    this.lastDamageTime = performance.now();
    if (this.currentHealth <= 0) this.die(source);
    return applied;
  }

  heal(amount) {
    if (!this.isAlive) return;
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
  }

  addShield(amount, duration) {
    this.shield = Math.max(this.shield, amount);
    this.shieldTimer = duration;
  }

  update(dt) {
    if (!this.isAlive) return;
    if (this.shieldTimer > 0) {
      this.shieldTimer -= dt;
      if (this.shieldTimer <= 0) this.shield = 0;
    }
    if (this.regenTimer > 0) this.regenTimer -= dt;
  }

  die(source) {
    if (!this.isAlive) return;
    this.isAlive = false;
    this.currentHealth = 0;
    if (this.onDeath) this.onDeath(source);
  }
}
