import counter from '../assets/buffs/counter.png';
import defend from '../assets/buffs/defend.png';
import endure from '../assets/buffs/endure.png';
import immunity from '../assets/buffs/immunity.png';
import increaseAtkBar from '../assets/buffs/increase-atk-bar.png';
import increaseAttack from '../assets/buffs/increase-attack.png';
import increaseCritRate from '../assets/buffs/increase-crit-rate.png';
import increaseCritResist from '../assets/buffs/increase-crit-resist.png';
import increaseDefense from '../assets/buffs/increase-defense.png';
import increaseSpeed from '../assets/buffs/increase-speed.png';
import invincible from '../assets/buffs/invincible.png';
import protectSoul from '../assets/buffs/protect-soul.png';
import recovery from '../assets/buffs/recovery.png';
import reflectedDmg from '../assets/buffs/reflected-dmg.png';
import threat from '../assets/buffs/threat.png';
import vampire from '../assets/buffs/vampire.png';
import bomb from '../assets/buffs/bomb.png';
import brand from '../assets/buffs/brand.png';
import buffblock from '../assets/buffs/buffblock.png';
import decreaseatk from '../assets/buffs/decreaseatk.png';
import dot from '../assets/buffs/dot.png';
import decreaseatkbar from '../assets/buffs/decreaseatkbar.png';
import decreasedef from '../assets/buffs/decreasedef.png';
import decreasespeed from '../assets/buffs/decreasespeed.png';
import freeze from '../assets/buffs/freeze.png';
import glancing from '../assets/buffs/glancing.png';
import oblivion from '../assets/buffs/oblivion.png';
import provoke from '../assets/buffs/provoke.png';
import silence from '../assets/buffs/silence.png';
import strip from '../assets/buffs/strip.png';
import sleep from '../assets/buffs/sleep.png';
import stun from '../assets/buffs/stun.png';
import unrecoverable from '../assets/buffs/unrecoverable.png';

export const heroes = [
    {
        id: 0,
        name: 'Rica',
        effects: ['stun', 'sleep', ],
        notes:'',
        turnOrder: 1,
        runes: '',
        usage: '',

    },
]

export const effects = [
    {
        id: 0,
        name: 'counter',
        icon: counter,
        description: 'When attacked, the target will counterattack to inflict 75% of the Attack Power as damage.',
    },
    {
        id: 1,
        name: 'defend',
        icon: defend,
        description: 'The caster of this skill will take 50% of the damage instead of the attacked ally and the attacked ally will receive 0 damage. (Harmful effects may still be applied.)',
    },
    {
        id: 2,
        name: 'endure',
        icon: endure,
        description: 'Monster temporarily cannot be killed as HP cannot go below 1.',
    },
    {
        id: 3,
        name: 'immunity',
        icon: immunity,
        description: 'Monster is immune to all negative status effects / Harmful Effects / Weakening Effects / Debuffs.',
    },
    {
        id: 4,
        name: 'increaseAtkBar',
        icon: increaseAtkBar,
        description: 'The ATK bar of ally monsters is filled by a set %.',
    },
    {
        id: 5,
        name: 'increaseAttack',
        icon: increaseAttack,
        description: 'Attack Power is increased.',
    },
    {
        id: 6,
        name: 'increaseCritRate',
        icon: increaseCritRate,
        description: 'Critical Hit Rate is increased.',
    },
    {
        id: 7,
        name: 'increaseCritResist',
        icon: increaseCritResist,
        description: 'Critical Hit Rate against the monster is reduced.',
    },
    {
        id: 8,
        name: 'increaseDefense',
        icon: increaseDefense,
        description: 'Defense is increased.',
    },
    {
        id: 9,
        name: 'increaseSpeed',
        icon: increaseSpeed,
        description: 'Speed is increased (Attack Bar will fill faster).',
    },
]